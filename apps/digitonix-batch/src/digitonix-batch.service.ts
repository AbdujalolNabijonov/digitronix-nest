import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'apps/digitronix/src/libs/dto/member/member';
import { Product } from 'apps/digitronix/src/libs/dto/product/product';
import { MemberStatus } from 'apps/digitronix/src/libs/enums/member';
import { MemberType } from 'apps/digitronix/src/libs/enums/member.enum';
import { ProductStatus } from 'apps/digitronix/src/libs/enums/product.enum';
import { T } from 'apps/digitronix/src/libs/types/general';
import { Model } from 'mongoose';

@Injectable()
export class DigitonixBatchService {
  constructor(
    @InjectModel("Product") readonly productModel:Model<Product>,
    @InjectModel("Member") readonly memberModel:Model<Member>
  ){}
  async handleRollback(): Promise<void> {
    const memberMatch: T = {
      memberType: MemberType.RETAILER,
      memberStatus: MemberStatus.ACTIVE
    }
    const productMatch: T = {
      productStatus: ProductStatus.ACTIVE
    }

    await this.memberModel.updateMany(memberMatch, { memberRank: 0 }).exec()
    await this.productModel.updateMany(productMatch, { propertyRank: 0 }).exec()
  }

  async handleTopProducts(): Promise<void> {
    const propertyMatch: T = {
      productStatus: ProductStatus.ACTIVE,
      productRank: 0
    }

    const properties = await this.productModel.find(propertyMatch).exec();
    const pendingList = properties.map(async (product: Product) => {
      const { productLikes, productViews } = product
      const totalRank = productLikes * 2 + productViews * 1
      return await this.productModel.findByIdAndUpdate(product._id, { productRank: totalRank })
    })
    await Promise.all(pendingList)
  }

  async handleTopRetailers(): Promise<void> {
    const memberMatch: T = {
      memberType: MemberType.RETAILER,
      memberStatus: MemberStatus.ACTIVE,
      memberRank: 0
    }

    const members = await this.memberModel.find(memberMatch).exec()
    const pendingList = members.map(async (member: Member) => {
      const { memberLikes, memberProducts, memberViews } = member;

      const totalRank = memberProducts * 5 + memberLikes * 3 + memberViews * 2;
      return await this.memberModel.findByIdAndUpdate(member._id, { memberRank: totalRank }).exec()
    })

    await Promise.all(pendingList)
  }
}
