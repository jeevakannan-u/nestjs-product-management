import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login (@Req() req) {
      return this.authService.generateToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth-test')
  async authTest(){
    return 'Authorized'
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHandshake();
  }
}
