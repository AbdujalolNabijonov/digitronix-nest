import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Computer, Peripheral} from '../../libs/dto/product/product';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/types/member';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { ProductPCInput, ProductPerpheralInput } from '../../libs/dto/product/product.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Roles(MemberGroup.SELLER)
    @UseGuards(RolesGuard)
    @Mutation(returns => Computer)
    public async createPcProduct(
        @Args("input") input: ProductPCInput,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Computer> {
        console.log("Mutation: createPcProduct");
        input.memberId = memberId;
        return await this.productService.createPcProduct(input)
    }

    @Roles(MemberGroup.SELLER)
    @UseGuards(RolesGuard)
    @Mutation(returns => Peripheral)
    public async createPeripheral(
        @Args("input") input: ProductPerpheralInput,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Peripheral> {
        console.log("Mutation: createPeripheral")
        input.memberId = memberId
        return await this.productService.createPeripheral(input)
    }
}
