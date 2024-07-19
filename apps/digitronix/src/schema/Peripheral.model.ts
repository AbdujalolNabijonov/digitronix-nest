import { Schema } from "mongoose";
import {
    Connectivity,
    MaterialType,
    ProductStatus,
    ProductType,
    RgbType
} from "../libs/enums/product.enum";

const peripheralSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productStatus: {
        type: String,
        enum: ProductStatus,
        default: ProductStatus.ACTIVE
    },
    productType: {
        type: String,
        enum: ProductType,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    productConnectivity: {
        type: String,
        enum: Connectivity
    },
    productMaterial: {
        type: String,
        enum: MaterialType
    },
    poductRgbType: {
        type: String,
        enum: RgbType
    },
    productImages: {
        type: [String],
        required: true
    },
    productDesc: {
        type: [String]
    },
    productPrice: {
        type: Number,
        required: true
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

peripheralSchema.index({ productName: 1, productColor: 1, productConnectivity: 1 }, { unique: true })

export default peripheralSchema