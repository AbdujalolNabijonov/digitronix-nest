import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Like } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';
import { ProductInquiry } from '../../libs/dto/product/product.input';
import { GetAllProducts } from '../../libs/dto/product/product';
import { T } from '../../libs/types/general';
import { LikeGroup } from '../../libs/enums/like.enum';
import { Direction } from '../../libs/enums/common.enum';
import { lookup } from 'node:dns/promises';
import { lookupAuthMemberLiked } from '../../libs/types/config';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel("Like") private readonly likeModel: Model<Like>,
    ) { }

    public async likeTargetToggle(input: LikeInput): Promise<number> {
        const { memberId, likeTargetId } = input;
        const doesExist = await this.checkLikedBefore(memberId, likeTargetId);
        let modifier: number;
        if (!doesExist) {
            await this.likeModel.create(input);
            modifier = 1
        } else {
            await this.likeModel.findOneAndDelete({ memberId, likeTargetId })
            modifier = -1
        }
        return modifier
    }

    private async checkLikedBefore(memberId: ObjectId, likeTargetId: ObjectId): Promise<Boolean> {
        const search = {
            likeTargetId,
            memberId,
        }
        const result = await this.likeModel.findOne(search).exec();
        return !!result
    }

    public async checkExistence(input: LikeInput): Promise<Like> {
        return await this.likeModel.findOne(input).exec()
    }


    public async favorityProducts(input: ProductInquiry, memberId: ObjectId): Promise<GetAllProducts> {
        const { page, limit, sort, direction } = input
        const match: T = {
            likeGroup: LikeGroup.PRODUCT,
            memberId
        }
        const sorting: T = { [sort ?? "createdAt"]: direction ?? Direction.ASC };
        const favoriteList = await this.likeModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $lookup: {
                    from: "products",
                    localField: "likeTargetId",
                    foreignField: "_id",
                    as: "favorityProduct"
                }
            },
            { $unwind: "$favorityProduct" },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $lookup: {
                                from: "members",
                                localField: "memberId",
                                foreignField: "_id",
                                as: "favorityProduct.memberData"
                            }
                        },
                        lookupAuthMemberLiked(memberId, "$likeTargetId"),
                        { $unwind: "$favorityProduct.memberData" }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        let result = {
            list: favoriteList[0].list.map(ele => {
                return ({ ...ele.favorityProduct, meLiked: ele.meLiked })
            }),
            metaCounter: favoriteList[0].metaCounter
        }
        return result
    }
}
