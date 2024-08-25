import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, isNotEmpty, IsNotEmpty, IsOptional, Length } from "class-validator";
import {
    Connectivity,
    GraphicsType,
    MaterialType,
    ProductCategory,
    ProductBrand,
    ProductSeries,
    ProductStatus,
    ProductLabel,
} from "../../enums/product.enum";
import { ObjectId } from "mongoose";
import { avaibleProductSorts } from "../../types/config";
import { Direction } from "../../enums/common.enum";

@InputType()
export class ProductInput {
    memberId: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    productName: string;

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus

    @IsOptional()
    @Field(() => ProductLabel, { nullable: true })
    productLabel?: ProductLabel

    @IsNotEmpty()
    @Field(() => ProductBrand)
    productBrand: ProductBrand

    @IsNotEmpty()
    @Field(() => ProductCategory)
    productCategory: ProductCategory

    @IsNotEmpty()
    @Field(() => Number)
    productPrice: number

    @IsNotEmpty()
    @Field(() => String)
    productColor: String

    @IsOptional()
    @Field(() => String, { nullable: true })
    productCore?: string

    @IsOptional()
    @Field(() => ProductSeries, { nullable: true })
    productSerie?: ProductSeries

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productDisplay?: number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productMemory?: number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productStorage?: number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productWeight?: number

    @IsOptional()
    @Field(() => GraphicsType, { nullable: true })
    productGraphics?: GraphicsType;

    @IsOptional()
    @Field(() => Connectivity, { nullable: true })
    productConnectivity?: Connectivity

    @IsOptional()
    @Field(() => MaterialType, { nullable: true })
    productMaterial?: MaterialType

    @IsNotEmpty()
    @Field(() => [String])
    productImages: string[]

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productDesc?: string[];
}


@InputType()
class PriceRange {
    @Field(() => Int)
    start: number

    @Field(() => Int)
    end: number
}

@InputType()
class PISearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus

    @IsOptional()
    @Field(() => ProductCategory, { nullable: true })
    productCategory?: ProductCategory

    @IsOptional()
    @Field(() => [String], { nullable: true })
    brandList?: string[]

    @IsOptional()
    @Field(() => PriceRange, { nullable: true })
    pricesRange?: PriceRange

    @IsOptional()
    @Field(() => [String], { nullable: true })
    processorList?: string[]

    @IsOptional()
    @Field(() => [ProductSeries], { nullable: true })
    serieList?: ProductSeries[]

    @IsOptional()
    @Field(() => [Number], { nullable: true })
    displayList?: number[]

    @IsOptional()
    @Field(() => [Number], { nullable: true })
    memoryList?: number[]

    @IsOptional()
    @Field(() => [GraphicsType], { nullable: true })
    graphicsList?: GraphicsType[]

    @IsOptional()
    @Field(() => [Connectivity], { nullable: true })
    connectList?: Connectivity[]

    @IsOptional()
    @Field(() => [MaterialType], { nullable: true })
    materialList?: MaterialType[]
}

@InputType()
export class ProductInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @IsIn(avaibleProductSorts)
    @Field(() => String, { nullable: true })
    sort?: string

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: string

    @IsNotEmpty()
    @Field(() => PISearch)
    search: PISearch
}