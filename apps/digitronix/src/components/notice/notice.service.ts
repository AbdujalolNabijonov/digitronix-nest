import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { DeleteNotice, Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeInput, NoticeInquiry } from '../../libs/dto/notice/notice.input';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { Message } from '../../libs/common';
import { lookUpMember } from '../../libs/config';
import { NoticeGroup } from '../../libs/enums/notice.enum';
import { memoryUsage } from 'process';

@Injectable()
export class NoticeService {
    constructor(@InjectModel("Notice") readonly noticeModel: Model<Notice>) { }

    async createNotice(input: NoticeInput): Promise<Notice> {
        try {
            console.log("Mutation: createNotice")
            const result = await this.noticeModel.create(input);
            return result
        } catch (err) {
            console.log(`DB ERROR:createNotice, ${err.message} `)
            throw err
        }
    }

    async getAllNotices(memberId: ObjectId, input: NoticeInquiry): Promise<Notices> {
        const { page, limit, search, sort, direction } = input;
        const match: T = {}
        if (search.noticeGroup&&search.noticeGroup===NoticeGroup.ADMIN) match.noticeGroup = search.noticeGroup
        else if(search.noticeGroup){
            match.noticeTargetId = memberId
            match.noticeGroup = search.noticeGroup
        }
        else {
            match.noticeTargetId = memberId
            match.noticeGroup = { $ne: "ADMIN" }
        }

        if (search.memberId) match.noticeTargetId = search.memberId
        const sorting: T = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }
        const facetagg = []
        if (page) facetagg.push({ $skip: (page - 1) * limit })
        facetagg.push({ $limit: limit })
        facetagg.push(lookUpMember, { $unwind: "$memberData" })
        const result = await this.noticeModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: facetagg,
                    metaCounter: [{ $count: "total" }]
                }
            }
        ])
        return result[0]
    }

    async deleteNotices(memberId: ObjectId): Promise<DeleteNotice> {
        const result = await this.noticeModel.deleteMany({ noticeTargetId: memberId, noticeGroup: { $ne: "ADMIN" } }).exec()
        return result
    }

    //Admin
    async deleteTargetNotice(targetId: ObjectId): Promise<Notice> {
        const result = await this.noticeModel.findOneAndDelete({ _id: targetId, noticeGroup: NoticeGroup.ADMIN }).exec();
        return result
    }
}