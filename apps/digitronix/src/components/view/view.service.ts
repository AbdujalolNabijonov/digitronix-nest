import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { View } from '../../libs/dto/view/view';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ProductInquiry } from '../../libs/dto/product/product.input';
import { GetAllProducts } from '../../libs/dto/product/product';
import { T } from '../../libs/types/general';
import { ViewGroup } from '../../libs/enums/view.enum';
import { Direction } from '../../libs/enums/common.enum';
import { lookupAuthMemberLiked, lookupVisitedProducts } from '../../libs/config';

@Injectable()
export class ViewService {
    constructor(
        @InjectModel("View") private readonly viewModel: Model<View>
    ) { }

    public async recordView(input: ViewInput): Promise<View | null> {
        const existance = await this.viewModel.findOne(input).exec();
        if (existance) {
            return null
        } else {
            return await this.viewModel.create(input);
        }
    }

    public async visitedProducts(input: ProductInquiry, memberId: ObjectId): Promise<GetAllProducts> {
        const { page, limit, sort, direction, search } = input;
        const match: T = {
            viewGroup: ViewGroup.PRODUCT,
            memberId
        }
        const sorting: T = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }
        const visitedProducts = await this.viewModel.aggregate([
            { $match: match },
            { $sort: sorting },
            lookupVisitedProducts(),
            { $unwind: "$visitedProduct" },
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
                                as: "visitedProduct.memberData"
                            }
                        },
                        { $unwind: "$visitedProduct.memberData" },
                        lookupAuthMemberLiked(memberId, "$viewTargetId"),
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        const result = {
            list: visitedProducts[0].list.map(ele => ({ ...ele.visitedProduct, meLiked: ele.meLiked })),
            metaCounter: visitedProducts[0].metaCounter
        }
        return result
    }

}
