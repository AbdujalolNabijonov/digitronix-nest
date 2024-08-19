import { Field, InputType } from "@nestjs/graphql";
import { IsIn, isNotEmpty, IsNotEmpty, IsOptional, Length } from "class-validator";
import {
    Connectivity,
    GraphicsSeries,
    GraphicsType,
    MaterialType,
    ProductCategory,
    ProductBrand,
    ProductSeries,
    ProductStatus,
} from "../../enums/product.enum";
import { ObjectId } from "mongoose";

@InputType()
export class ProductInput {

    memberId: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    productName: string;

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus

    @IsNotEmpty()
    @Field(() => ProductBrand)
    productBrand: ProductBrand

    @IsNotEmpty()
    @Field(() => ProductCategory)
    productCategory: ProductCategory

    @IsNotEmpty()
    @Field(() => Number)
    productPrice: Number

    @IsNotEmpty()
    @Field(() => String)
    productColor: String

    @IsOptional()
    @Field(() => String, { nullable: true })
    productCore?: String

    @IsOptional()
    @Field(() => String, { nullable: true })
    productCoreGen?: String

    @IsOptional()
    @Field(() => ProductSeries, { nullable: true })
    productSerie?: ProductSeries

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productDisplay?: Number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productMemory?: Number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productStorage?: Number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productWeight?: Number

    @IsOptional()
    @Field(() => GraphicsType, { nullable: true })
    productCardType?: GraphicsType;

    @IsOptional()
    @Field(() => GraphicsSeries, { nullable: true })
    productCardSerie?: GraphicsSeries;

    @IsOptional()
    @Field(() => Connectivity, { nullable: true })
    productConnectivity?: Connectivity

    @IsOptional()
    @Field(() => MaterialType, { nullable: true })
    productMaterial?: MaterialType

    @IsNotEmpty()
    @Field(() => [String])
    productImages: String[]

    @IsNotEmpty()
    @Field(() => [String])
    productDesc: String[];

}