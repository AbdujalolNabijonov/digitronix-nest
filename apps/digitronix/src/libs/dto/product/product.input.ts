import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Connectivity, CoreList, GraphicsSeries, GraphicsType, ProcessorGen, ProcessorType, ProductColors, ProductCompany, ProductSeries, ProductType, RgbType } from "../../enums/product.enum";
import { ObjectId } from "mongoose";

@InputType()
export class ProductPCInput {

    memberId?: ObjectId

    @IsNotEmpty()
    @Length(5, 25)
    @Field(() => String)
    productName: string

    @IsNotEmpty()
    @Field(() => ProductCompany)
    productCompany: ProductCompany

    @IsNotEmpty()
    @Field(() => ProductType)
    productType: ProductType

    @IsNotEmpty()
    @Field(() => ProductSeries)
    productSerie: ProductSeries

    @IsNotEmpty()
    @Field(() => ProcessorType)
    productProcessor: ProcessorType

    @IsNotEmpty()
    @Field(() => ProcessorGen)
    productPocessorGen:ProcessorGen;

    @IsNotEmpty()
    @Field(() => GraphicsSeries)
    productGraphicsSerie: GraphicsSeries

    @IsNotEmpty()
    @Field(() => GraphicsType)
    productGraphicsType: GraphicsType

    @IsOptional()
    @Field(() => Number, { nullable: true })
    productDisplay?: number

    @IsNotEmpty()
    @Field(() => ProductColors)
    productColor: ProductColors

    @IsNotEmpty()
    @Field(() => CoreList)
    productCore: CoreList

    @IsNotEmpty()
    @Field(() => Number)
    productMemory: number

    @IsNotEmpty()
    @Field(() => Number)
    productStorage: number

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

    @IsNotEmpty()
    @Field(() => [String])
    productImages: string[]

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productDesc?: string

    @IsNotEmpty()
    @Field(() => Number)
    productPrice: number
}

@InputType()
export class ProductItemInput {
    memberId?: ObjectId

    @IsNotEmpty()
    @Length(5, 25)
    @Field(() => String)
    productName: string;

    @IsNotEmpty()
    @Field(() => ProductType)
    poductType: ProductType

    @IsNotEmpty()
    @Field(() => ProductSeries)
    productSerie?: ProductSeries

    @IsNotEmpty()
    @Field(() => ProductColors)
    productColor?: ProductColors

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productDesc?: string[]

    @IsOptional()
    @Field(() => RgbType, { nullable: true })
    productRgbType?: RgbType

    @IsNotEmpty()
    @Field(() => Connectivity)
    productConnectivity?: Connectivity

    @IsNotEmpty()
    @Field(() => Number)
    productPrice?: number
}