import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import {
    Connectivity,
    MaterialType,
    ProductBrand,
    ProductCategory,
    ProductLabel,
    ProductSeries,
    ProductStatus
} from "../../enums/product.enum";
import { Member } from "../member/member";
import { MeLiked } from "../like/like";

@ObjectType()
export class Product {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String)
    memberId: ObjectId;

    @Field(() => String)
    productName: string;

    @Field(() => ProductStatus)
    productStatus: ProductStatus

    @Field(() => String, { nullable: true })
    productLabel?: ProductLabel

    @Field(() => ProductBrand)
    productBrand: ProductBrand

    @Field(() => ProductCategory)
    productCategory: ProductCategory

    @Field(() => Number)
    productPrice: number

    @Field(() => String, { nullable: true })
    productColor?: string

    @Field(() => String, { nullable: true })
    productCore?: string

    @Field(() => ProductSeries, { nullable: true })
    productSerie?: ProductSeries

    @Field(() => Number, { nullable: true })
    productDisplay?: number

    @Field(() => String, { nullable: true })
    productOS?: string

    @Field(() => Number, { nullable: true })
    productMemory?: number

    @Field(() => Number, { nullable: true })
    productStorage?: number

    @Field(() => Number, { nullable: true })
    productWeight?: number

    @Field(() => String, { nullable: true })
    productGraphics?: string;

    @Field(() => Connectivity, { nullable: true })
    productConnectivity?: Connectivity

    @Field(() => MaterialType, { nullable: true })
    productMaterial?: MaterialType

    @Field(() => [String])
    productImages: string[]

    @Field(() => String, { nullable: true })
    productDesc?: string;

    @Field(() => Number)
    productViews: number

    @Field(() => Number)
    productLikes: number

    @Field(() => Number)
    productComments: number

    @Field(() => Number)
    productRank: number

    @Field(() => Member, { nullable: true })
    memberData?: Member

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[]

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
export class GetAllProducts {
    @Field(() => [Product])
    list: Product[]

    @Field(() => [MetaCounter])
    metaCounter: MetaCounter[]
}

@ObjectType()
class MetaCounter {
    @Field(() => Number, { nullable: true })
    total?: number
}