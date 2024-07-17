import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductPCInput, ProductPerpheralInput } from '../../libs/dto/product/product.input';
import { Computer, Peripheral } from '../../libs/dto/product/product';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel("Computer") private readonly computerModel: Model<Computer>,
        @InjectModel("Peripheral") private readonly peripheralModel: Model<Peripheral>
    ) { }

    public async createPcProduct(input: ProductPCInput): Promise<Computer> {
        return await this.computerModel.create(input)
    }

    public async createPeripheral(input: ProductPerpheralInput): Promise<Peripheral> {
        return await this.peripheralModel.create(input)
    }
}
