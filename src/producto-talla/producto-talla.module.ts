import { Module } from '@nestjs/common';
import { ProductoTallaService } from './producto-talla.service';
import { ProductoTallaController } from './producto-talla.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ProductoTallaController],
  providers: [ProductoTallaService, PrismaService],
})
export class ProductoTallaModule {}
