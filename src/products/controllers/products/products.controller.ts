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
import { CreateProductDto } from '../../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../../dtos/UpdateProduct.dto';
import { ProductsService } from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

 
  @Get()
  getProducts() {
    return this.productService.findProducts();
  }

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    let product = await this.productService.createProduct(createProductDto);
    return product;
  }

 
  @Put(':id')
  async updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
     await this.productService.updateProduct(id, updateProductDto);
     return {status:"success",message:`Product with id = ${id} updated successfully` };
  }

  @Delete(':id')
  async deleteProductById(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
    return {status:"success",message:`Product with id = ${id} deleted successfully` };
  }

 

 
}
