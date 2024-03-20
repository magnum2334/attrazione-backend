import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoTallaDto } from './create-producto-talla.dto';

export class UpdateProductoTallaDto extends PartialType(CreateProductoTallaDto) {}
