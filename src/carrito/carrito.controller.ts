import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post('create')
  async create(@Body() data) {
    data.fecha = new Date();
    let { total, fecha, clienteId } = data;

    const carrito = await this.carritoService.create({
      total,
      fecha,
      clienteId,
    });

    // Crear detalle del carrito
    const detalle = data.detalle.map((item) => ({
      ...item,
      carritoId: carrito.id,
    }));
    for (const iterator of detalle) {
      await this.carritoService.createDetalle(iterator);
    }
    return carrito;
  }

  @Get()
  findAll() {
    return this.carritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarritoDto: UpdateCarritoDto) {
    return this.carritoService.update(+id, updateCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritoService.remove(+id);
  }
}
