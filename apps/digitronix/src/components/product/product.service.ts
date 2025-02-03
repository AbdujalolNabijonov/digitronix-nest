import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { Message } from '../../libs/common';
import { LikeService } from '../like/like.service';
import { ViewService } from '../view/view.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ProductStatus } from '../../libs/enums/product.enum';
import { UpdateProduct } from '../../libs/dto/product/product.update';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { lookupAuthMemberLiked, lookUpMember, shapeIntoMongoObjectId } from '../../libs/types/config';
import * as moment from "moment"
import { ProductInput, ProductInquiry } from '../../libs/dto/product/product.input';
import { GetAllProducts, Product } from '../../libs/dto/product/product';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel("Product") private readonly productModel: Model<Product>,
        private readonly memberService: MemberService,
        private readonly likeService: LikeService,
        private readonly viewService: ViewService
    ) { }

    public async createProduct(input: ProductInput): Promise<Product> {
        try {
            const newProduct = await this.productModel.create(input)
            if (newProduct) {
                await this.memberService.memberStatsEdit(input.memberId, 1, "memberProducts")
            }
            return newProduct
        } catch (err: any) {
            console.log("Error: Service.model, ", err.message)
            throw new BadRequestException(Message.CREATE_FAILED)
        }
    }

    public async getProduct(targetId: ObjectId, memberId: ObjectId): Promise<Product> {
        let exist = await this.productModel.findById(targetId).exec();
        if (!exist) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const product = await this.productModel.aggregate([
            { $match: { _id: targetId } },
            lookupAuthMemberLiked(memberId),
            lookUpMember,
            { $unwind: "$memberData" }
        ])
        if (memberId) {
            //view
            const viewInput: ViewInput = {
                memberId,
                viewTargetId: targetId,
                viewGroup: ViewGroup.COMPUTER
            }
            const existanceView = await this.viewService.recordView(viewInput);
            if (existanceView) {
                await this.productStatsEdit(targetId, 1, "productViews")
                exist.productViews++
            }
        }
        return product[0]
    }


    public async updateProduct(input: UpdateProduct): Promise<Product> {
        let { productStatus, soldAt, deletedAt } = input

        const existance = await this.productModel.findOne({ _id: input._id, productStatus: ProductStatus.ACTIVE }).exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (productStatus === ProductStatus.SOLD) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate()

        const result = await this.productModel
            .findByIdAndUpdate(
                input._id,
                input,
                { returnDocument: "after" })
            .exec()
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEdit(input.memberId, -1, "memberProducts")
        }
        return result
    }


    public async getAllProducts(input: ProductInquiry, authId: ObjectId): Promise<GetAllProducts> {
        const { page, limit, sort, direction } = input;
        const {
            memberId,
            text,
            productCategory,
            brandList,
            pricesRange,
            processorList,
            serieList,
            displayList,
            memoryList,
            graphicsList,
            connectList,
            materialList,
        } = input.search

        const match: T = { productStatus: ProductStatus.ACTIVE }
        if (memberId) match.memberId = shapeIntoMongoObjectId(memberId)
        if (text) match.productName = { $regex: new RegExp(text, "i") };
        if (productCategory) match.productCategory = productCategory;
        if (brandList && brandList.length) match.productBrand = { $in: brandList };
        if (pricesRange) match.productPrice = { $gte: pricesRange.start, $lte: pricesRange.end };
        if (processorList && processorList.length) match.productCore = { $in: processorList.map((processor) => new RegExp(processor.replace(/_/g, " "), "i")) };
        if (serieList && serieList.length) match.productSerie = { $in: serieList };
        if (displayList && displayList.length) match.productDisplay = { $in: displayList };
        if (memoryList && memoryList.length) match.productMemory = { $in: memoryList };
        if (graphicsList && graphicsList.length) match.productGraphics = { $in: graphicsList.map(graphics=>new RegExp(graphics.replace(/_/g, " "), "i")) };
        if (connectList && connectList.length) match.productConnectivity = { $in: connectList };
        if (materialList && materialList.length) match.productMaterial = { $in: materialList };
        const sorting:any = { [sort ?? "createdAt"]: direction ?? Direction.DESC }
        const result = await this.productModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupAuthMemberLiked(authId),
                        lookUpMember,
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        
        return result[0]
    }

    public async likeTargetProduct(targetLikeId: ObjectId, memberId: ObjectId): Promise<Product> {
        const exist = await this.productModel.findById(targetLikeId).exec()
        if (!exist) throw new InternalServerErrorException(Message.NO_DATA_FOUND)

        const likeInput: LikeInput = {
            memberId,
            likeTargetId: targetLikeId,
            likeGroup: exist.productCategory
        }

        const modifier = await this.likeService.likeTargetToggle(likeInput);

        const result = await this.productStatsEdit(targetLikeId, modifier, "productLikes")
        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG)
        return result
    }


    //ADMIN
    public async updateProductByAdmin(input: UpdateProduct, memberId: ObjectId): Promise<Product> {
        let { productStatus, soldAt, deletedAt } = input
        input._id = shapeIntoMongoObjectId(input._id)
        const search = {
            _id: input._id,
            productStatus: ProductStatus.ACTIVE
        }
        const existance = await this.productModel.findById(input._id).lean().exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (productStatus === ProductStatus.SOLD) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETE) deletedAt = moment().toDate();

        delete input._id
        const result = await this.productModel.findOneAndUpdate(search, input, { returnDocument: "after" }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEdit(
                existance.memberId,
                -1,
                "memberProducts"
            )
        }
        return result
    }


    public async getAllProductsByAdmin(input: ProductInquiry): Promise<GetAllProducts> {
        const { page, limit, direction, sort } = input;
        const { productStatus, productCategory, text } = input.search

        const match: T = {};
        if (productStatus) match.productStatus = productStatus;
        if (productCategory) match.productCategory = productCategory;
        if (text) match.productName = { $regex: new RegExp(text, "i") }

        const sorting: T = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }

        const result = await this.productModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookUpMember,
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        return result[0]
    }

    public async productStatsEdit(_id: ObjectId, modifier: number, dataset: string): Promise<Product> {
        const result = await this.productModel.findByIdAndUpdate(_id, { $inc: { [dataset]: modifier } }, { new: true }).exec();
        return result
    }
}
