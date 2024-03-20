import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClientModule } from './client/client.module';
import { OrdenModule } from './orden/orden.module';
import { CarritoModule } from './carrito/carrito.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { ProductoTallaModule } from './producto-talla/producto-talla.module';
import * as path from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'images'), 
      serveRoot: '/images', 
    }),
    ClientModule,
    OrdenModule,
    CarritoModule,
    DepartamentoModule,
    ProductoTallaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
