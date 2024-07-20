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
import { Member } from "../member/member";

@ObjectType()
export class Computer {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => String)
    memberId: ObjectId

    @Field(() => String)
    productName: string

    @Field(() => ProductCompany)
    productCompany: ProductCompany

    @Field(() => ProductStatus)
    productStatus: ProductStatus

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

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[]

    @Field(() => Member)
    memberData: Member

    @Field(() => Date, { nullable: true })
    soldAt?: Date

    @Field(() => Date, { nullable: true })
    deletedAt?: Date

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
export class Peripheral {
    @Field(() => String)
    _id: ObjectId;

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

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[]

    @Field(() => Member, { nullable: true })
    memberData?: Member

    @Field(() => Date, { nullable: true })
    soldAt?: Date

    @Field(() => Date, { nullable: true })
    deletedAt?: Date

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
class Total {
    @Field(() => Number, { nullable: true })
    total?: number
}

@ObjectType()
export class Computers {
    @Field(() => [Computer])
    list: Computer[]

    @Field(() => [Total])
    metaCounter: Total[]
}

@ObjectType()
export class Peripherals {
    @Field(() => [Peripheral])
    list: Peripheral[]

    @Field(() => [Total])
    metaCounter: Total
}
