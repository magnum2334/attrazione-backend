import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Producto, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(data): Promise<Producto> {
    return this.prisma.producto.create({
      data,
    });
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(productId: number, tallaId) {
    return await this.prisma.producto.findUnique({
      where: {
        id: productId,
      },
      include: {
        productoTalla: {
          where: {
            tallaId: tallaId, // Filtro para el id de la talla
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async decreaseStock(productId: number, cantidad: number) {
    // try {
    //   const updatedProduct = await this.prisma.producto.update({
    //     where: { id: productId },
    //     data: {
    //       stock: {
    //         decrement: cantidad, // Decrementar el stock en la cantidad especificada
    //       },
    //     },
    //   });
    //   // Consulta el producto actualizado para obtener el stock actualizado
    //   const updatedProductWithStock = await this.prisma.producto.findUnique({
    //     where: { id: productId },
    //     select: {
    //       stock: true, // Incluye solo el campo de stock en la respuesta
    //     },
    //   });

    //   // Verificar si el stock actualizado es 0
    //   if (updatedProductWithStock.stock === 0) {
    //     // Actualizar el estado del producto a "agotado"
    //     await this.prisma.producto.update({
    //       where: { id: productId },
    //       data: {
    //         estado: 'agotado',
    //       },
    //     });
    //   }
    // } catch (error) {
    //   // Manejo de errores
    //   console.error('Error al disminuir el stock del producto:', error);
    //   throw new Error('Error al disminuir el stock del producto');
    // }
  }
}
