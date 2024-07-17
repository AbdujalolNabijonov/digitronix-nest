import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import productSchema from '../../schema/Product.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Product", schema:productSchema}]),
    AuthModule
  ],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
