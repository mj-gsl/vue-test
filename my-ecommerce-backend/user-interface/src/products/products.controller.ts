// src/products/products.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('submit-product')
  @UseInterceptors(FileInterceptor('image'))
  async addProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() productData: { name: string; description: string; price: number; category: string, userId: number },
  ) {
    // Ensure that all required fields are provided
    if (!file || !productData.name || !productData.description || !productData.price || !productData.category || !productData.userId) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    try {
      // Call the service to handle the product creation
      const product = await this.productsService.insertProduct(
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.userId,
        file,
      );
      return { id: product.id, message: 'Product submitted successfully', product };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
