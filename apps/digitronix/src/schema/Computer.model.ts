import { Schema } from "mongoose";
import {
    CoreList,
    GraphicsSeries,
    GraphicsType,
    ProcessorGen,
    ProcessorType,
    ProductCompany,
    ProductSeries,
    ProductStatus,
    ProductType,
    RgbType
} from "../libs/enums/product.enum";

const computerSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productCompany: {
        type: String,
        enum: ProductCompany,
        require: true
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
    productType: {
        type: String,
        enum: ProductType,
        default: ProductType.COMPUTER
    },
    productSerie: {
        type: String,
        enum: ProductSeries,
        required: true
    },
    productProcessor: {
        type: String,
        enum: ProcessorType,
        required: true
    },
    productProcessorGen: {
        type: String,
        enum: ProcessorGen,
        required: true
    },
    productGraphicsSerie: {
        type: String,
        emun: GraphicsSeries,
        required: true,
    },
    productGraphicsType: {
        type: String,
        emun: GraphicsType,
        required: true
    },
    productDisplay: {
        type: Number,
    },
    productColor: {
        type: String,
        required: true
    },
    productCore: {
        type: String,
        enum: CoreList,
        required: true
    },
    productMemory: {
        type: Number,
        required: true
    },
    productStorage: {
        type: Number,
        required: true
    },
    poductBattery: {
        type: String,
    },
    poductRgbType: {
        type: String,
        enum: RgbType
    },
    productWebCam: {
        type: String,
    },
    productWeight: {
        type: Number,
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
    }
}, { timestamps: true })

computerSchema.index({ productName: 1, productProcessor: 1, memberId: 1, productGraphicsType: 1, productMemory: 1 }, { unique: true })

export default computerSchema
