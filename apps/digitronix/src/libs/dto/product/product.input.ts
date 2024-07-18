import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional, Length } from "class-validator";
import {
    Connectivity,
    CoreList,
    GraphicsSeries,
    GraphicsType,
    MaterialType,
    ProcessorGen,
    ProcessorType,
    ProductCompany,
    ProductSeries,
    ProductType,
    RgbType
} from "../../enums/product.enum";
import { ObjectId } from "mongoose";
import { avaibleProductSorts, } from "../../types/config";
import { Direction } from "../../enums/common.enum";

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
    productProcessorGen: ProcessorGen;

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
    @Field(() => String)
    productColor: string

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
export class ProductPerpheralInput {
    memberId?: ObjectId

    @IsNotEmpty()
    @Length(5, 25)
    @Field(() => String)
    productName: string;

    @IsNotEmpty()
    @Field(() => ProductType)
    productType: ProductType

    @IsNotEmpty()
    @Field(() => ProductSeries)
    productSerie: ProductSeries

    @IsNotEmpty()
    @Field(() => String)
    productColor: string

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productDesc?: string[]

    @IsOptional()
    @Field(() => RgbType, { nullable: true })
    productRgbType?: RgbType

    @IsNotEmpty()
    @Field(() => Connectivity)
    productConnectivity: Connectivity

    @IsNotEmpty()
    @Field(() => Number)
    productPrice: number
}

@InputType()
class PriceRange {
    @IsOptional()
    @Field(() => Number, { nullable: true })
    start?: number

    @IsOptional()
    @Field(() => Number, { nullable: true })
    end?: number
}


@InputType()
class PISearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string

    @IsOptional()
    @Field(() => [ProductSeries], { nullable: true })
    productSerie?: ProductSeries[]

    @IsOptional()
    @Field(() => [ProcessorGen], { nullable: true })
    productProcessorGen?: ProcessorGen[]

    @IsOptional()
    @Field(() => [GraphicsType], { nullable: true })
    productGraphicsType?: GraphicsType[]

    @IsOptional()
    @Field(() => [Number], { nullable: true })
    productDispaly?: number[]

    @IsOptional()
    @Field(() => [ProductCompany], { nullable: true })
    productCompany?: ProductCompany[]

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productColor?: string[]

    @IsOptional()
    @Field(() => PriceRange, { nullable: true })
    priceRange?: PriceRange
}


@InputType()
export class ProductComputerInquiry {
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
    diection?: Direction

    @IsNotEmpty()
    @Field(() => PISearch)
    search: PISearch
}

@InputType()
class PPISearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string

    @IsOptional()
    @Field(() => [Connectivity], { nullable: true })
    connectivity?: Connectivity[]

    @IsOptional()
    @Field(() => [ProductCompany], { nullable: true })
    productCompany?: ProductCompany[]

    @IsOptional()
    @Field(() => [String], { nullable: true })
    productColor?: string[]

    @IsOptional()
    @Field(() => [MaterialType], { nullable: true })
    productMaterial?: MaterialType[]

    @IsOptional()
    @Field(() => PriceRange, { nullable: true })
    priceRange?: PriceRange
}

@InputType()
export class ProductPeripheralInquiry {
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
    direction?: Direction

    @IsNotEmpty()
    @Field(() => PPISearch)
    search: PPISearch
}