import { Test, TestingModule } from '@nestjs/testing';
import { ProductoTallaController } from './producto-talla.controller';
import { ProductoTallaService } from './producto-talla.service';

describe('ProductoTallaController', () => {
  let controller: ProductoTallaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoTallaController],
      providers: [ProductoTallaService],
    }).compile();

    controller = module.get<ProductoTallaController>(ProductoTallaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
