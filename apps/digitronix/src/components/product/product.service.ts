import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProductPCInput, ProductPerpheralInput } from '../../libs/dto/product/product.input';
import { Computer, Peripheral } from '../../libs/dto/product/product';
import { MemberService } from '../member/member.service';
import { Message } from '../../libs/common';
import { LikeService } from '../like/like.service';
import { ViewService } from '../view/view.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ProductType } from '../../libs/enums/product.enum';
import { UpdateProductPc, UpdateProductPeripheral } from '../../libs/dto/product/product.update';

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
                await this.memberService.memberStatsEdit(input.memberId, 1, "memberDevices")
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
                await this.memberService.memberStatsEdit(input.memberId, 1, "memberDevices")
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
                result.meLiked = {
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
                await this.productStatsEdit(targetId, 1, "productViews", ProductType.LAPTOP)
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
                result.meLiked = {
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
        const result = await this.computerModel
            .findByIdAndUpdate(
                input._id,
                input,
                { returnDocument: "after" })
            .exec()
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
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



    public async productStatsEdit(_id: ObjectId, modifier: number, dataset: string, productType: ProductType): Promise<void> {
        if (productType === ProductType.PERIPHERAL) {
            await this.peripheralModel.findOneAndUpdate(
                { _id },
                { $inc: { [dataset]: modifier } },
                { returnDocument: "after" }
            ).exec()
        } else {
            await this.computerModel.findOneAndUpdate(
                { _id },
                { $inc: { [dataset]: modifier } },
                { returnDocument: "after" }
            ).exec()
        }

    }
}
