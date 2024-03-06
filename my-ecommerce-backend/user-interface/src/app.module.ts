// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(/* ... */),
    TypeOrmModule.forFeature([Product]), // Include this to use Product repository
  ],
  controllers: [ProductsController],
  providers: [ProductsService], // Add the ProductsService to the providers array
})
export class AppModule {}
