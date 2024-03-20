import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Controller('departamento')
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Post()
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentoService.create(createDepartamentoDto);
  }

  @Post('create')
  async fetch() {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json',
      );
      const data = await response.json();
      
      // Insertar departamentos y ciudades
      for (const departamento of data) {
        const createdDepartamento = await this.departamentoService.create(departamento);
      }
    // Realizar cualquier otra operación necesaria con los datos

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto,
  ) {
    return this.departamentoService.update(+id, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentoService.remove(+id);
  }
}
