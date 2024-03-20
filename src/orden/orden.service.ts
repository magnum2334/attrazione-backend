import { Injectable } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrdenService {
  constructor(private prisma: PrismaService) {}
  create(data) {
    return this.prisma.orden.create({
      data,
    });
  }
  createDetalle(data) {
    return this.prisma.ordenDetalle.create({
      data,
    });
  }

  findAll() {
    return `This action returns all orden`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orden`;
  }

  async findByCodigo(codigo: string) {
    return await this.prisma.orden.findFirst({
      where: {
        codigo: codigo,
      },
    });
  }

  update(id: number, updateOrdenDto: UpdateOrdenDto) {
    return `This action updates a #${id} orden`;
  }

  remove(id: number) {
    return `This action removes a #${id} orden`;
  }
}
