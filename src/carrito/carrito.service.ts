import { Injectable } from '@nestjs/common';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CarritoService {
  constructor(private prisma: PrismaService) { }
  
  create(data) {
    return this.prisma.carrito.create({
      data,
    });
  }
  createDetalle(data) {
    return this.prisma.carritoDetalle.create({
      data,
    });
  }

  findAll() {
    return `This action returns all carrito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrito`;
  }

  update(id: number, updateCarritoDto: UpdateCarritoDto) {
    return `This action updates a #${id} carrito`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrito`;
  }
}
