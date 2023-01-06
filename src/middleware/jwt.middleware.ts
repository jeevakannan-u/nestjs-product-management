import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService ){

  }
  use(req: Request, res: Response, next: NextFunction) {
    console.log('JWT Middleware');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    
    let bearerToken = authorization.replace('Bearer ','');
    let payload;
    try {
      payload = this.jwtService.verify(bearerToken, { secret: 'test'});
      
      const { user,sub, iat, exp } = payload;
          // check if user is active or not
          // other user level checks from Payload
      if (Number(user)) {
        req['userid'] = user;
        next();
      }
      else
        throw new HttpException(
          'Invalid Authorization Token',
          HttpStatus.FORBIDDEN,
        );
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}