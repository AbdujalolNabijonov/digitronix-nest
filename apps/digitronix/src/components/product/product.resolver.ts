import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/enums/member';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { UpdateProduct } from '../../libs/dto/product/product.update';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProductInput, ProductInquiry } from '../../libs/dto/product/product.input';
import { GetAllProducts, Product } from '../../libs/dto/product/product';
import { LikeService } from '../like/like.service';
import { ViewService } from '../view/view.service';

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
        private readonly likeService: LikeService,
        private readonly viewService: ViewService
    ) { }

    @Roles(MemberGroup.RETAILER)
    @UseGuards(RolesGuard)
    @Mutation(returns => Product)
    public async createProduct(
        @Args("input") input: ProductInput,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Product> {
        console.log("Mutation: createProduct");
        input.memberId = memberId;
        return await this.productService.createProduct(input)
    }


    @UseGuards(WithoutGuards)
    @Query(() => Product)
    public async getProduct(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Product> {
        console.log("Query: getProduct");
        const targetId = shapeIntoMongoObjectId(input)
        return await this.productService.getProduct(targetId, memberId)
    }


    @Roles(MemberGroup.RETAILER)
    @UseGuards(RolesGuard)
    @Mutation(() => Product)
    public async updateProduct(
        @Args("input") input: UpdateProduct,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Product> {
        console.log("Mutation: updateProduct");
        input.memberId = memberId;
        input._id = shapeIntoMongoObjectId(input._id)
        return await this.productService.updateProduct(input)
    }


    @UseGuards(WithoutGuards)
    @Query(() => GetAllProducts)
    public async getAllProducts(
        @Args("input") input: ProductInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<GetAllProducts> {
        console.log("Query: getAllProducts");
        return await this.productService.getAllProducts(input, memberId)
    }

    // @Roles(MemberGroup.USER)
    @UseGuards(AuthGuard)
    @Query(() => GetAllProducts)
    public async favorityProducts(
        @Args("input") input: ProductInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<GetAllProducts> {
        console.log("Query: myFavorities");
        return await this.likeService.favorityProducts(input, memberId)
    }

    @UseGuards(AuthGuard)
    @Query(() => GetAllProducts)
    public async visitedProducts(
        @Args("input") input: ProductInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<GetAllProducts> {
        console.log("Query: visitedProducts");
        return await this.viewService.visitedProducts(input, memberId)
    }


    @UseGuards(AuthGuard)
    @Mutation(() => Product)
    public async likeTargetProduct(
        @Args("input") input: string,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Product> {
        console.log("Mutation: likeTargetProduct");
        const targetLikeId = shapeIntoMongoObjectId(input)
        return await this.productService.likeTargetProduct(targetLikeId, memberId)
    }


    //ADMIN
    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Product)
    public async updateProductByAdmin(
        @Args("input") input: UpdateProduct,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Product> {
        console.log("Mutation: updateProductByAdmin");
        return await this.productService.updateProductByAdmin(input, memberId)
    }


    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => GetAllProducts)
    public async getAllProductsByAdmin(
        @Args("input") input: ProductInquiry
    ): Promise<GetAllProducts> {
        console.log("Query: getAllProductsByAdmin");
        return await this.productService.getAllProductsByAdmin(input)
    }
}
