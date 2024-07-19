import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Computer, Computers, Peripheral, Peripherals } from '../../libs/dto/product/product';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/types/member';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { ProductComputerInquiry, ProductPCInput, ProductPeripheralInquiry, ProductPerpheralInput } from '../../libs/dto/product/product.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/types/config';
import { UpdateProductPc, UpdateProductPeripheral } from '../../libs/dto/product/product.update';
import { AuthGuard } from '../auth/guards/auth.guard';

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
    ): Promise<Computer | Error> {
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
    ): Promise<Peripheral | Error> {
        console.log("Mutation: createPeripheral")
        input.memberId = memberId
        return await this.productService.createPeripheral(input)
    }

    @UseGuards(WithoutGuards)
    @Query(() => Computer)
    public async getProductPc(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Computer> {
        console.log("Query: getProductPc");
        const targetId = shapeIntoMongoObjectId(input)
        return await this.productService.getProductPc(targetId, memberId)
    }

    @UseGuards(WithoutGuards)
    @Query(returns => Peripheral)
    public async getProductPeripheral(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Peripheral> {
        console.log("Query: getProductPeripheral");
        const targetId = shapeIntoMongoObjectId(input)
        return await this.productService.getProductPeripheral(targetId, memberId)
    }

    @Roles(MemberGroup.SELLER)
    @UseGuards(RolesGuard)
    @Mutation(() => Computer)
    public async updateProductPc(
        @Args("input") input: UpdateProductPc,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Computer> {
        console.log("Mutation: updateProductPc");
        input.memberId = memberId;
        input._id = shapeIntoMongoObjectId(input._id)
        return await this.productService.updateProductPc(input)
    }

    @Roles(MemberGroup.SELLER)
    @UseGuards(RolesGuard)
    @Mutation(returns => Peripheral)
    public async updateProductPeripheral(
        @Args("input") input: UpdateProductPeripheral,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Peripheral> {
        console.log("Mutation: updateProductPeripheral");
        input._id = shapeIntoMongoObjectId(input._id);
        return await this.productService.updateProductPeripheral(input)
    }

    @UseGuards(WithoutGuards)
    @Query(() => Computers)
    public async getAllProductPcs(
        @Args("input") input: ProductComputerInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Computers> {
        console.log("Query:getAllProductPcs");
        return await this.productService.getAllProductPcs(input, memberId)
    }

    @UseGuards(WithoutGuards)
    @Query(() => Peripherals)
    public async getAllProductPeripherals(
        @Args("input") input: ProductPeripheralInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Peripherals> {
        console.log("Query:getAllProductPeripherals");
        return await this.productService.getAllProductPeripherals(input, memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Computer)
    public async likeTargetPc(
        @Args("input") input: string,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Computer> {
        console.log("Mutation: likeTargetPc");
        const targetLikeId = shapeIntoMongoObjectId(input)
        return await this.productService.likeTargetPc(targetLikeId, memberId)
    }
    likeTargetPeripheral() { }

    //ADMIN
    updateProductPcByAdmin() { }
    updateProductPeripheralByAdmin() { }

    getAllProductPcsByAdmin() { }
    getAllProductPeripheralsByAdmin() { }
}
