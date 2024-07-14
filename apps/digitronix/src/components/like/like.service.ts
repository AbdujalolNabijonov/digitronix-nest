import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Like } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';

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

}
