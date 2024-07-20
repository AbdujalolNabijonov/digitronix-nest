import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProductComputerInquiry, ProductPCInput, ProductPeripheralInquiry, ProductPerpheralInput } from '../../libs/dto/product/product.input';
import { Computer, Computers, Peripheral, Peripherals } from '../../libs/dto/product/product';
import { MemberService } from '../member/member.service';
import { Message } from '../../libs/common';
import { LikeService } from '../like/like.service';
import { ViewService } from '../view/view.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ProductStatus, ProductType } from '../../libs/enums/product.enum';
import { UpdateProductPc, UpdateProductPeripheral } from '../../libs/dto/product/product.update';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { lookupAuthMemberLiked, lookUpMember } from '../../libs/types/config';
import * as moment from "moment"

@Injectable()
export class ProductService {
    constructor(
        @InjectModel("Computer") private readonly computerModel: Model<Computer>,
        @InjectModel("Peripheral") private readonly peripheralModel: Model<Peripheral>,
        private readonly memberService: MemberService,
        private readonly likeService: LikeService,
        private readonly viewService: ViewService
    ) { }

    public async createPcProduct(input: ProductPCInput): Promise<Computer | Error> {
        try {
            const newComputer = await this.computerModel.create(input)
            if (newComputer) {
                await this.memberService.memberStatsEdit(input.memberId, 1, "memberProducts")
            }
            return newComputer
        } catch (err: any) {
            console.log("Error: Service.model, ", err.message)
            return new BadRequestException(Message.CREATE_FAILED)
        }
    }

    public async createPeripheral(input: ProductPerpheralInput): Promise<Peripheral | Error> {
        try {
            const newPeripheral = await this.peripheralModel.create(input)
            if (newPeripheral) {
                await this.memberService.memberStatsEdit(input.memberId, 1, "memberProducts")
            }
            return newPeripheral
        } catch (err: any) {
            console.log("Error: Service.model, ", err.message)
            return new BadRequestException(Message.CREATE_FAILED)
        }
    }

    public async getProductPc(targetId: ObjectId, memberId: ObjectId): Promise<Computer> {
        let result = await this.computerModel.findById(targetId).exec();
        if (!result) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        if (memberId) {
            //like
            const likeInput: LikeInput = {
                memberId,
                likeTargetId: targetId,
                likeGroup: LikeGroup.COMPUTER
            }
            const existanceLike = await this.likeService.checkExistence(likeInput)
            if (existanceLike) {
                result[0].meLiked = {
                    memberId,
                    likeTargetId: targetId,
                    myFavorite: true
                }
            }
            //view
            const viewInput: ViewInput = {
                memberId,
                viewTargetId: targetId,
                viewGroup: ViewGroup.COMPUTER
            }
            const existanceView = await this.viewService.recordView(viewInput);
            if (existanceView) {
                await this.productStatsEdit(targetId, 1, "productViews", ProductType.DESKTOP)
                result.productViews++
            }
        }
        return result
    }

    public async getProductPeripheral(targetId: ObjectId, memberId: ObjectId): Promise<Peripheral> {
        let result: Peripheral;
        result = await this.peripheralModel.findById(targetId).exec();
        if (!result) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        if (memberId) {
            //like
            const likeInput: LikeInput = {
                memberId,
                likeGroup: LikeGroup.PERIPHERAL,
                likeTargetId: targetId
            }

            const existanceLike = await this.likeService.checkExistence(likeInput)
            if (existanceLike) {
                result[0].meLiked = {
                    memberId,
                    likeTargetId: targetId,
                    myFavorite: true
                }
            }
            //view
            const viewInput: ViewInput = {
                memberId,
                viewTargetId: targetId,
                viewGroup: ViewGroup.PERIPHERAL
            }
            const existanceView = await this.viewService.recordView(viewInput);
            if (existanceView) {
                await this.productStatsEdit(targetId, 1, "productViews", ProductType.PERIPHERAL);
                result.productViews++
            }
        }
        return result
    }

    public async updateProductPc(input: UpdateProductPc): Promise<Computer> {
        let { productStatus, soldAt, deletedAt } = input

        const existance = await this.computerModel.findOne({ _id: input._id, productStatus: ProductStatus.ACTIVE }).exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (productStatus === ProductStatus.SOLD) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETED) deletedAt = moment().toDate()

        const result = await this.computerModel
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

    public async updateProductPeripheral(input: UpdateProductPeripheral): Promise<Peripheral> {
        const result = await this.peripheralModel
            .findByIdAndUpdate(
                input._id,
                input,
                { returnDocument: "after" })
            .exec()
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result
    }

    public async getAllProductPcs(input: ProductComputerInquiry, memberId: ObjectId): Promise<Computers> {
        const { page, limit, sort, direction } = input;
        const {
            text,
            productSerie,
            productColor,
            productCompany,
            productDispaly,
            productGraphicsType,
            productProcessorGen,
            priceRange,
        } = input.search

        const match: T = { productStatus: ProductStatus.ACTIVE }
        if (text) match.productName = { $regex: new RegExp(text, "i") };
        if (productSerie && productSerie.length) match.productSerie = { $in: productSerie };
        if (productColor && productColor.length) match.productColor = { $in: productColor };
        if (productCompany && productCompany.length) match.productCompany = { $in: productCompany };
        if (productDispaly && productDispaly.length) match.prodcutLength = { $in: productDispaly };
        if (productGraphicsType && productGraphicsType.length) match.productGraphicsType = { $in: productGraphicsType };
        if (productProcessorGen && productProcessorGen.length) match.productProcessorGen = { $in: productProcessorGen };
        if (priceRange) match.productPrice = { $gte: priceRange.start, $lte: priceRange.end }

        const sorting: T = { [sort ?? "createdAt"]: direction ?? Direction.DESC }
        const result = await this.computerModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupAuthMemberLiked(memberId),
                        lookUpMember,
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()

        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async getAllProductPeripherals(input: ProductPeripheralInquiry, memberId: ObjectId): Promise<Peripherals> {
        const { page, limit, direction, sort } = input

        const {
            text,
            connectivity,
            productCompany,
            productColor,
            productMaterial,
            priceRange
        } = input.search
        const match: T = { productStatus: ProductStatus.ACTIVE };

        if (text) match.productName = { $regex: new RegExp(text, "i") }
        if (connectivity && connectivity.length) match.productConnectivity = { $in: connectivity };
        if (productCompany && productCompany.length) match.productCompany = { $in: productCompany };
        if (productColor && productColor.length) match.productColor = { $in: productColor };
        if (productMaterial && productMaterial.length) match.productMaterial = { $in: productMaterial }
        if (priceRange) match.productPrice = { $gte: priceRange.start, $lte: priceRange.end }

        const sorting: T = { [sort ?? "createdAt"]: direction ?? Direction.DESC }

        const result = await this.peripheralModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupAuthMemberLiked(memberId),
                        lookUpMember,
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async likeTargetPc(targetLikeId: ObjectId, memberId: ObjectId): Promise<Computer> {
        const exist = await this.computerModel.findById(targetLikeId).exec()
        if (!exist) throw new InternalServerErrorException(Message.NO_DATA_FOUND)

        const likeInput: LikeInput = {
            memberId,
            likeTargetId: targetLikeId,
            likeGroup: LikeGroup.COMPUTER
        }
        const modifier = await this.likeService.likeTargetToggle(likeInput);

        const result = await this.productStatsEdit(targetLikeId, modifier, "productLikes", ProductType.DESKTOP)
        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG)
        return result
    }

    public async likeTargetPeripheral(likeTargetId: ObjectId, memberId: ObjectId): Promise<Peripheral> {
        const existance = await this.peripheralModel.findById(likeTargetId).lean().exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const likeInput: LikeInput = {
            memberId,
            likeTargetId,
            likeGroup: LikeGroup.PERIPHERAL
        }
        const modifier = await this.likeService.likeTargetToggle(likeInput);
        const result = await this.productStatsEdit(likeTargetId, modifier, "productLikes", ProductType.PERIPHERAL);
        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return result
    }

    //ADMIN
    public async updateProductPcByAdmin(input: UpdateProductPc, memberId: ObjectId): Promise<Computer> {
        let { productStatus, soldAt, deletedAt } = input
        const search = {
            _id: input._id,
            productStatus: ProductStatus.ACTIVE
        }
        const existance = await this.computerModel.findById(input._id).lean().exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (productStatus === ProductStatus.SOLD) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETED) deletedAt = moment().toDate();

        delete input._id
        const result = await this.computerModel.findOneAndUpdate(search, input, { returnDocument: "after" }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEdit(
                input.memberId,
                -1,
                "memberProducts"
            )
        }
        return result
    }

    public async updateProductPeripheralByAdmin(input: UpdateProductPeripheral): Promise<Peripheral> {
        let { productStatus, soldAt, deletedAt } = input

        const search: T = {
            _id: input._id,
            productStatus: ProductStatus.ACTIVE
        }
        const existance = await this.peripheralModel.findOne(search).exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (productStatus === ProductStatus.SOLD) soldAt = moment().toDate();
        else if (productStatus === ProductStatus.DELETED) deletedAt = moment().toDate();

        const result = await this.peripheralModel.findOneAndUpdate(search, input, { new: true }).exec();

        if (soldAt || deletedAt) {
            await this.memberService.memberStatsEdit(input.memberId, -1, "memberProducts")
        }
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED)
        return result
    }

    public async getAllProductPcsByAdmin(input: ProductComputerInquiry): Promise<Computers> {
        const { page, limit, direction, sort } = input;
        const { productStatus, productType, text } = input.search

        const match: T = {};
        if (productStatus) match.producStatus = productStatus;
        if (productType) match.productType = productType;
        if (text) match.productName = { $regex: new RegExp(text, "i") }

        const sorting: T = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }

        const result = await this.computerModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookUpMember,
                        {$unwind:"$memberData"}
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        if (!result[0] && !result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        return result[0]
    }

    public async productStatsEdit(_id: ObjectId, modifier: number, dataset: string, productType: ProductType): Promise<any> {
        if (productType === ProductType.PERIPHERAL) {
            return await this.peripheralModel.findOneAndUpdate(
                { _id },
                { $inc: { [dataset]: modifier } },
                { returnDocument: "after" }
            ).exec()
        } else {
            return await this.computerModel.findOneAndUpdate(
                { _id },
                { $inc: { [dataset]: modifier } },
                { returnDocument: "after" }
            ).exec()
        }

    }
}
