// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async insertProduct(name: string, description: string, price: number, category: string, userId: number, image: Express.Multer.File): Promise<Product> {
    const imageUrl = await this.uploadImageToS3(image);
    const product = this.productsRepository.create({
      name,
      description,
      price,
      category,
      imageUrl,
      userId, // This should be the ID of the user submitting the product
    });

    await this.productsRepository.save(product);
    return product;
  }

  private async uploadImageToS3(file: Express.Multer.File): Promise<string> {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `products/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read', // You might want to set the appropriate ACL
    }).promise();

    return uploadResult.Location;
  }
}
