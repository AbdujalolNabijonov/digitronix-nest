import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import computerSchema from '../../schema/Computer.model';
import peripheralSchema from '../../schema/Peripheral.model';
import { MemberModule } from '../member/member.module';
import { LikeModule } from '../like/like.module';
import { ViewModule } from '../view/view.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Computer", schema: computerSchema }]),
    MongooseModule.forFeature([{ name: "Peripheral", schema: peripheralSchema }]),
    AuthModule,
    MemberModule,
    LikeModule,
    ViewModule
  ],
  providers: [ProductResolver, ProductService],
  exports:[
    ProductService
  ]
})
export class ProductModule { }
