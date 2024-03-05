// src/products/products.controller.ts
import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service'; // Assume you have a service for handling product logic

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('submit-product')
  @UseInterceptors(FileInterceptor('image'))
  async addProduct(
    @UploadedFile() image,
    @Body('name') productName: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
    @Body('category') productCategory: string,
  ) {
    // Assuming you have a method in your service to handle the product creation
    const generatedId = await this.productsService.insertProduct(
      productName,
      productDescription,
      productPrice,
      productCategory,
      image,
    );
    return { id: generatedId };
  }
}
