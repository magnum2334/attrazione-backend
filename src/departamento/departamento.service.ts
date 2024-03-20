import { Injectable } from '@nestjs/common';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DepartamentoService {
  constructor(private prisma: PrismaService) {}

  async create(departamentoData) {
    const { departamento, ciudades } = departamentoData;

    const departamentos = await this.prisma.departamento.create({
      data: {
        nombre: departamento,
        ciudad: {
          createMany: {
            data: ciudades.map((ciudad: string) => ({
              nombre: ciudad,
            })),
          },
        },
      },
      include: {
        ciudad: true,
      },
    });

    return departamentos;
  }

  findAll() {
    return `This action returns all departamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
