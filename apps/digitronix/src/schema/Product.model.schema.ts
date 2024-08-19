import { Schema } from "mongoose";
import {
    Connectivity,
    GraphicsSeries,
    GraphicsType,
    MaterialType,
    ProductBrand,
    ProductCategory,
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
        type: String,
        required: true
    },
    productCore: {
        type: String
    },
    productCoreGen: {
        type: Number
    },
    productSerie: {
        type: String,
        enum: ProductSeries,
    },
    productDisplay: {
        type: Number
    },
    productMemory: {
        type: Number,
        required: true
    },
    productStorage: {
        type: Number,
        required: true
    },
    productWeight: {
        type: Number,
    },
    productCardType: {
        type: String,
        enum: GraphicsType
    },
    productCardSerie: {
        type: String,
        enum: GraphicsSeries
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
})

productSchema.index({ productName: 1, productColor: 1, memberId: 1 }, { unique: true })
export default productSchema