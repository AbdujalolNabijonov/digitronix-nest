import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsPort, Length } from "class-validator";
import { ObjectId } from "mongoose";
import {
    Connectivity,
    MaterialType,
    OperatingSystem,
    ProductBrand,
    ProductCategory,
    ProductLabel,
    ProductSeries,
    ProductStatus
} from "../../enums/product.enum";

@InputType()
export class UpdateProduct {
    memberId?: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    _id: ObjectId

    @IsOptional()
    @Length(5, 30)
    @Field(() => String, { nullable: true })
    productName?: string;

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus

    @IsOptional()
    @Field(() => ProductLabel, { nullable: true })
    productLabel?: ProductLabel

    @IsOptional()
    @Field(() => ProductBrand, { nullable: true })
    productBrand?: ProductBrand

    @IsOptional()
    @Field(() => ProductCategory, { nullable: true })
    productCategory?: ProductCategory

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productPrice?: number

    @IsOptional()
    @Field(() => String, { nullable: true })
    productColor?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    productCore?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    productCoreGen?: string

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
    @Field(() => OperatingSystem, { nullable: true })
    productOS?: OperatingSystem

    @IsOptional()
    @Field(() => String, { nullable: true })
    productGraphics?: string;

    @IsOptional()
    @Field(() => Connectivity, { nullable: true })
    productConnectivity?: Connectivity

    @IsOptional()
    @Field(() => MaterialType, { nullable: true })
    productMaterial?: MaterialType

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productImages?: String[]

    @IsOptional()
    @Field(() => String, { nullable: true })
    productDesc?: String;

    soldAt?: Date
    deletedAt?: Date
}
