import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { CreateUserProductDto } from '../../dtos/CreateUserProduct.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    let user = await this.userService.createUser(createUserDto);
    delete user.password;
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/products')
  createUserProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateUserProductDto: CreateUserProductDto,
  ) {
    return this.userService.createUserProduct(id, CreateUserProductDto);
  }
}
