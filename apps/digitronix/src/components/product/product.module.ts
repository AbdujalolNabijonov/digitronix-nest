import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import computerSchema from '../../schema/Computer.model';
import peripheralSchema from '../../schema/Peripheral.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Computer", schema: computerSchema }]),
    MongooseModule.forFeature([{ name: "Peripheral", schema: peripheralSchema }]),
    AuthModule
  ],
  providers: [ProductResolver, ProductService]
})
export class ProductModule { }
