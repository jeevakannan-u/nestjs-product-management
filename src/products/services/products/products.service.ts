import { HttpException, HttpStatus, Injectable,Scope,Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { Product } from '../../../typeorm/entities/Product';
import {
  CreateProductParams,
  UpdateProductParams
} from '../../../utils/types';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(REQUEST) private request: Request
  ) {}

  findProducts() {
    return this.productRepository.find({ });
  }

  async createProduct(productDetails: CreateProductParams) {
    let loggedInUserId = this.request["userid"];
    const newProduct = this.productRepository.create({
      name:productDetails.name,
      price:productDetails.price,
      quantity:productDetails.quantity,
      active:productDetails.active,
      user: loggedInUserId
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
