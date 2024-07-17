import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
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
    ProductStatus,
    ProductType,
    RgbType
} from "../../enums/product.enum";
import { MeLiked } from "../like/like";

@ObjectType()
export class Computer {
    @Field(() => String)
    memberId: ObjectId

    @Field(() => String)
    productName: string

    @Field(() => ProductCompany)
    productCompany: ProductCompany

    @Field(() => ProductType)
    productType: ProductType

    @Field(() => ProductSeries)
    productSerie: ProductSeries

    @Field(() => ProcessorType, { nullable: true })
    productProcessor?: ProcessorType

    @Field(() => ProcessorGen, { nullable: true })
    productPocessorGen?: ProcessorGen

    @Field(() => GraphicsSeries, { nullable: true })
    productGraphicsSerie?: GraphicsSeries

    @Field(() => GraphicsType, { nullable: true })
    productGraphicsType?: GraphicsType

    @Field(() => Number, { nullable: true })
    productDisplay?: number

    @Field(() => String)
    productColor: string

    @Field(() => CoreList, { nullable: true })
    productCore?: CoreList

    @Field(() => Number, { nullable: true })
    productMemory?: number

    @Field(() => Number, { nullable: true })
    productStorage?: number

    @Field(() => String, { nullable: true })
    poductBattery?: string

    @Field(() => RgbType, { nullable: true })
    poductRgbType?: RgbType

    @Field(() => String, { nullable: true })
    productWebCam?: string

    @Field(() => Number, { nullable: true })
    productWeight?: number

    @Field(() => [String])
    productImages: string[]

    @Field(() => [String], { nullable: true })
    productDesc?: string

    @Field(() => Number)
    productPrice: number

    @Field(() => RgbType, { nullable: true })
    productRgbType?: RgbType

    @Field(() => Connectivity, { nullable: true })
    productConnectivity?: Connectivity

    @Field(() => Number)
    productLikes: number

    @Field(() => Number)
    productViews: number

    @Field(() => Number)
    productComments: number

    @Field(() => Number)
    productRank: number

    @Field(() => MeLiked, { nullable: true })
    meLiked?: MeLiked

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
export class Peripheral {
    @Field(() => String)
    memberId: ObjectId

    @Field(() => ProductStatus)
    productStatus: ProductStatus

    @Field(() => ProductType)
    productType: ProductType

    @Field(() => String)
    productName: string

    @Field(() => String)
    productColor: string

    @Field(() => Connectivity)
    productConnectivity: Connectivity

    @Field(() => MaterialType, { nullable: true })
    productMaterial?: MaterialType

    @Field(() => RgbType, { nullable: true })
    poductRgbType?: RgbType

    @Field(() => [String])
    productImages: string[]

    @Field(() => [String])
    productDesc: string[]

    @Field(() => Number)
    productPrice: number

    @Field(() => Number)
    productViews: number

    @Field(() => Number)
    productLikes: number

    @Field(() => Number)
    productComments: number

    @Field(() => Number)
    productRank: number

    @Field(() => MeLiked, { nullable: true })
    meLiked?: MeLiked

    @Field(() => Date, { nullable: true })
    soldAt?: Date

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}
