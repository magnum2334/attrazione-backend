import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ProductoTallaService } from 'src/producto-talla/producto-talla.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, JwtService, ProductoTallaService],
})
export class ProductModule {}
