import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { LikeModule } from '../like/like.module';
import { ViewModule } from '../view/view.module';
import productSchema from '../../schema/Product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: productSchema, name: "Product" }]),
    AuthModule,
    MemberModule,
    LikeModule,
    ViewModule
  ],
  providers: [ProductResolver, ProductService],
  exports: [
    ProductService
  ]
})
export class ProductModule { }
