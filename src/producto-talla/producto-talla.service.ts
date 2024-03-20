import { Injectable } from '@nestjs/common';
import { CreateProductoTallaDto } from './dto/create-producto-talla.dto';
import { UpdateProductoTallaDto } from './dto/update-producto-talla.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductoTallaService {
  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.productoTalla.create({
      data,
    });
  }
  findAll() {
    return `This action returns all productoTalla`;
  }

  async findOne(productoId: number, tallaId: number) {
    return await this.prisma.productoTalla.findUnique({
      where: {
        productoId_tallaId: {
          productoId: productoId,
          tallaId: tallaId,
        },
      },
      include: {
        producto: true, // Incluir los datos del producto
        talla: true, // Incluir los datos de la talla
      },
    });
  }

  update(id: number, updateProductoTallaDto: UpdateProductoTallaDto) {
    return `This action updates a #${id} productoTalla`;
  }

  remove(id: number) {
    return `This action removes a #${id} productoTalla`;
  }

  async decreaseStock(productId: number, tallaId: number, cantidad: number) {
    try {
      await this.prisma.productoTalla.update({
        where: {
          productoId_tallaId: {
            productoId: productId,
            tallaId: tallaId,
          },
        },
        data: {
          cantidad: {
            decrement: cantidad, // Decrementar el stock en la cantidad especificada
          },
        },
        select: {
          cantidad: true,
        },
      });
      this.inactivarProdCantCero(productId);
    } catch (error) {
      // Manejo de errores
      console.error('Error al disminuir el stock del producto:', error);
      throw new Error('Error al disminuir el stock del producto');
    }
  }

  async inactivarProdCantCero(productId: number) {
    try {
      // Consultar todos los registros de productoTalla para el producto dado
      const productoTallas = await this.prisma.productoTalla.findMany({
        where: {
          productoId: productId,
        },
      });
      // Verificar si todas las cantidades son 0
      const todasCantidadesCero = productoTallas.every(
        (productoTalla) => productoTalla.cantidad === 0,
      );
      console.log(todasCantidadesCero);
      if (todasCantidadesCero) {
        // Actualizar el estado del producto a "agotado"
        await this.prisma.producto.update({
          where: { id: productId },
          data: {
            estado: 'agotado',
          },
        });
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al inactivar el producto:', error);
      throw new Error('Error al inactivar el producto');
    }
  }
}
