import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Connectivity, CoreList, GraphicsSeries, GraphicsType, ProcessorGen, ProcessorType, ProductCompany, ProductSeries, ProductStatus, ProductType, RgbType } from "../../enums/product.enum";
import { ObjectId } from "mongoose";

@InputType()
export class UpdateProductPc {
    memberId?: ObjectId

    @IsNotEmpty()
    @Field(() => String)
    _id: string

    @IsOptional()
    @Length(5, 25)
    @Field(() => String, { nullable: true })
    productName?: string

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus

    @IsOptional()
    @Field(() => ProductCompany, { nullable: true })
    productCompany?: ProductCompany

    @IsOptional()
    @Field(() => ProductType, { nullable: true })
    productType?: ProductType

    @IsOptional()
    @Field(() => ProductSeries, { nullable: true })
    productSerie?: ProductSeries

    @IsOptional()
    @Field(() => ProcessorType, { nullable: true })
    productProcessor?: ProcessorType

    @IsOptional()
    @Field(() => ProcessorGen, { nullable: true })
    productProcessorGen?: ProcessorGen;

    @IsOptional()
    @Field(() => GraphicsSeries, { nullable: true })
    productGraphicsSerie?: GraphicsSeries

    @IsOptional()
    @Field(() => GraphicsType, { nullable: true })
    productGraphicsType?: GraphicsType

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productDisplay?: number

    @IsOptional()
    @Field(() => String, { nullable: true })
    productColor?: string

    @IsOptional()
    @Field(() => CoreList, { nullable: true })
    productCore?: CoreList

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productMemory?: number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productStorage?: number

    @IsOptional()
    @Field(() => String, { nullable: true })
    poductBattery?: string

    @IsOptional()
    @Field(() => RgbType, { nullable: true })
    poductRgbType?: RgbType

    @IsOptional()
    @Field(() => String, { nullable: true })
    productWebCam?: string

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productWeight?: number

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productImages: string[]

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productDesc?: string

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productPrice: number

    soldAt?: Date
    deletedAt?: Date

}

@InputType()
export class UpdateProductPeripheral {
    memberId?: ObjectId

    @IsNotEmpty()
    @Field(() => String)
    _id: string

    @IsOptional()
    @Length(5, 25)
    @Field(() => String, { nullable: true })
    productName?: string;

    @IsOptional()
    @Field(() => ProductStatus, { nullable: true })
    productStatus?: ProductStatus

    @IsOptional()
    @Field(() => ProductType, { nullable: true })
    productType?: ProductType

    @IsOptional()
    @Field(() => ProductSeries, { nullable: true })
    productSerie?: ProductSeries

    @IsOptional()
    @Field(() => String, { nullable: true })
    productColor?: string

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productDesc?: string[]

    @IsOptional()
    @Field(() => RgbType, { nullable: true })
    productRgbType?: RgbType

    @IsOptional()
    @Field(() => Connectivity, { nullable: true })
    productConnectivity?: Connectivity

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productPrice?: number

    @Field(() => Date, { nullable: true })
    soldAt?: Date

    @Field(() => Date, { nullable: true })
    deletedAt?: Date
}