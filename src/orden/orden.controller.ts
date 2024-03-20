import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdenService } from './orden.service';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { ProductoTallaService } from 'src/producto-talla/producto-talla.service';

@Controller('orden')
export class OrdenController {
  constructor(
    private readonly ordenService: OrdenService,
    private readonly ProductoTallaService: ProductoTallaService,
  ) {}

  @Post('create')
  async create(@Body() data) {
    data.fecha = new Date();
    let { total, fecha, clienteId, detalle } = data;

    const productOrder = [];
    const insufficientStockItems = [];
    for await (const item of detalle) {
      const inventario = await this.ProductoTallaService.findOne(
        item.productoId,
        item.tallaId,
      );
      if (item.cantidad <= inventario.cantidad) {
          productOrder.push({
            inventario,
          });
      } else {
          insufficientStockItems.push({
           error: 'insuficientes cantidades para el inventario del producto',
           insufficientStockItems: {
             nombre: item.nombre,
             tallaRequerida: inventario.talla.nombre,
             productoRequerido: inventario.producto.descripcion,
             cantidadRequerida: item.cantidad,
             cantidadDisponible: inventario.cantidad,
           },
         });
      }
    }
    // return { productOrder, insufficientStockItems };


    // Generar un código único para la orden
    let codigo;
    let isUnique = false;
    do {
      codigo = generateRandomCode(10);
      const existingOrden = await this.ordenService.findByCodigo(codigo);
      isUnique = !existingOrden;
    } while (!isUnique);
    console.log({
      codigo,
      total,
      fecha,
      clienteId,
    });
    
    const orden = await this.ordenService.create({
      codigo,
      total,
      fecha,
      clienteId,
    });

    // Disminuir los stocks de los productos en el detalle de la orden
    for (const item of detalle) {
      await this.ProductoTallaService.decreaseStock(
        item.productoId,
        item.tallaId,
        item.cantidad,
      );
    }

    // Crear detalle la orden
    const detalleOrden = detalle.map((item) => ({
      ...item,
      ordenId: orden.id,
    }));
    for (const item of detalleOrden) {
      await this.ordenService.createDetalle(item);
    }
    return orden.codigo;
  }

  @Get()
  findAll() {
    return this.ordenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenService.update(+id, updateOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenService.remove(+id);
  }
}
function generateRandomCode(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomCode;
}