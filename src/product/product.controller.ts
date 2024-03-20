import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { Observable, of } from 'rxjs';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { response } from 'express';
import { ProductoTallaService } from 'src/producto-talla/producto-talla.service';

export const storage = {
  storage: diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly ProductoTallaService: ProductoTallaService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image', storage))
  async createProduct(
    @Body()
    productData: {
      sku: string;
      descripcion: string;
      estado: string;
      detalle: string;
    },
    @UploadedFile() image: Express.Multer.File,
  ) {
    let { sku, descripcion, estado, detalle } = productData;

    try {
      const createdProduct = await this.productService.createProduct({
        sku,
        descripcion,
        estado,
        image: image.filename,
      });
      var detalleProducto = JSON.parse(detalle);
      const detalleProductoId = detalleProducto.map((objeto) => {
        // Crear una copia superficial del objeto para evitar modificar el original
        const dataCopy = { ...objeto };
        // Agregar el nuevo atributo
        dataCopy.productoId = createdProduct.id;
        return dataCopy;
      });

      for (const key in detalleProductoId) {
         await this.ProductoTallaService.create(detalleProductoId[key]);
      }
      return {
        createdProduct: createdProduct,
        detalleProductoId: detalleProductoId,
      };
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw new Error('Ha ocurrido un error al crear el producto');
    }
  }

  @Get('images/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(path.join(process.cwd(), '/public/images/' + imagename)),
    );
  }
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
