import { Test, TestingModule } from '@nestjs/testing';
import { ProductoTallaService } from './producto-talla.service';

describe('ProductoTallaService', () => {
  let service: ProductoTallaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoTallaService],
    }).compile();

    service = module.get<ProductoTallaService>(ProductoTallaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
