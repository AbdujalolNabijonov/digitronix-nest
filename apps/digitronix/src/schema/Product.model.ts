import { Schema } from "mongoose";
import {
    Connectivity,
    MaterialType,
    ProductBrand,
    ProductCategory,
    ProductLabel,
    ProductSeries,
    ProductStatus
} from "../libs/enums/product.enum";

const productSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.ACTIVE
    },
    productLabel: {
        type: String,
        enum: ProductLabel
    },
    productBrand: {
        type: String,
        enum: ProductBrand,
        required: true
    },
    productCategory: {
        type: String,
        enum: ProductCategory,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productColor: {
        type: String
    },
    productCore: {
        type: String
    },
    productSerie: {
        type: String,
        enum: ProductSeries,
    },
    productDisplay: {
        type: Number
    },
    productOS:{
        type:String
    },
    productMemory: {
        type: Number,
    },
    productStorage: {
        type: Number,
    },
    productWeight: {
        type: Number,
    },
    productGraphics: {
        type: String
    },
    productConnectivity: {
        type: String,
        enum: Connectivity
    },
    productMaterial: {
        type: String,
        enum: MaterialType
    },
    productImages: {
        type: [String],
        required: true
    },
    productDesc: {
        type: [String]
    },
    productViews: {
        type: Number,
        default: 0
    },
    productLikes: {
        type: Number,
        default: 0
    },
    productComments: {
        type: Number,
        default: 0
    },
    productRank: {
        type: Number,
        default: 0
    },
    soldAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true })

productSchema.index({ productName: 1, productColor: 1, memberId: 1 }, { unique: true })
export default productSchema