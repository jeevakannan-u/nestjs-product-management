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
import { Profile } from '../typeorm/entities/Profile';
import { User } from '../typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Product]),JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]  
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({
        path: 'users/register',
        method: RequestMethod.POST
      })
      .forRoutes(UsersController)
  }
}
