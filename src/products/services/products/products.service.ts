import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { Product } from '../../../typeorm/entities/Product';
import {
  CreateProductParams,
  UpdateProductParams
} from '../../../utils/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findProducts() {
    return this.productRepository.find({ });
  }

  async createProduct(productDetails: CreateProductParams) {
    const newProduct = this.productRepository.create({
      name:productDetails.name,
      price:productDetails.price,
      quantity:productDetails.quantity,
      active:productDetails.active
    });
    return await this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, updateProductDetails: UpdateProductParams) {
    return await this.productRepository.update({ id }, { ...updateProductDetails });
  }

  async deleteProduct(id: number) {
    return await this.productRepository.delete({ id });
  }

}
