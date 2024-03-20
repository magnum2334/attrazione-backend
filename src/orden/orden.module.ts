import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ProductoTallaService } from 'src/producto-talla/producto-talla.service';
ProductoTallaService;
@Module({
  controllers: [OrdenController],
  providers: [OrdenService, PrismaService, ProductoTallaService],
})
export class OrdenModule {}
