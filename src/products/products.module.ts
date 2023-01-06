import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { Product } from '../typeorm/entities/Product';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),JwtModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]  
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(ProductsController)
  }
}
