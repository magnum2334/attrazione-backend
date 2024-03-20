import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoTallaService } from './producto-talla.service';
import { CreateProductoTallaDto } from './dto/create-producto-talla.dto';
import { UpdateProductoTallaDto } from './dto/update-producto-talla.dto';

@Controller('producto-talla')
export class ProductoTallaController {
  constructor(private readonly productoTallaService: ProductoTallaService) {}

  @Post('create')
  async create(
    @Body()
    data,
  ) {
    try {
      const created = await this.productoTallaService.create({
        ...data,
      });
      // Devuelve el inventario creado como respuesta
      return created;
    } catch (error) {
      // Maneja el error adecuadamente
      console.error('Error al crear el inventario:', error);
      throw new Error('Ha ocurrido un error al crear el inventario');
    }
  }

  @Get()
  findAll() {
    return this.productoTallaService.findAll();
  }

  @Get(':id/:talla')
  findOne(@Param() params: { id, talla,}) {
    return this.productoTallaService.findOne(+params.id, params.talla);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoTallaDto: UpdateProductoTallaDto,
  ) {
    return this.productoTallaService.update(+id, updateProductoTallaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoTallaService.remove(+id);
  }
}
