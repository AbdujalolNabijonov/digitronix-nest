import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { DeleteNotice, Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeInput, NoticeInquiry, ReadAll, ReadNotices } from '../../libs/dto/notice/notice.input';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { Message } from '../../libs/common';
import { lookUpMember, shapeIntoMongoObjectId } from '../../libs/config';
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

        if (search.noticeGroup) match.noticeGroup = search.noticeGroup;
        match.noticeTargetId = memberId
        if (search.nonRead) match.noticeRead = false

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
        const allNotices = await this.noticeModel.aggregate([
            { $match: { noticeTargetId: memberId, noticeRead: false } },
            { $count: "total" },
            { $unwind: "$total" }
        ])
        const productNotices = await this.noticeModel.aggregate([
            { $match: { noticeTargetId: memberId, noticeGroup: NoticeGroup.PRODUCT, noticeRead: false } },
            { $count: "total" },
            { $unwind: "$total" }
        ])
        const articleNotices = await this.noticeModel.aggregate([
            { $match: { noticeTargetId: memberId, noticeGroup: NoticeGroup.ARTICLE, noticeRead: false } },
            { $count: "total" },
            { $unwind: "$total" }
        ])
        const followNotices = await this.noticeModel.aggregate([
            { $match: { noticeTargetId: memberId, noticeGroup: NoticeGroup.FOLLOW, noticeRead: false } },
            { $count: "total" },
            { $unwind: "$total" }
        ])
        const memberNotices = await this.noticeModel.aggregate([
            { $match: { noticeTargetId: memberId, noticeGroup: NoticeGroup.MEMBER, noticeRead: false } },
            { $count: "total" },
            { $unwind: "$total" }
        ])

        const categoryCount = {
            all: allNotices[0] ? allNotices[0]?.total : 0,
            product: productNotices[0] ? productNotices[0]?.total : 0,
            article: articleNotices[0] ? articleNotices[0]?.total : 0,
            follow: followNotices[0] ? followNotices[0].total : 0,
            member: memberNotices[0] ? memberNotices[0].total : 0
        }
        console.log(memberNotices)
        result[0].categoryCount = categoryCount;
        return result[0]
    }

    async deleteNotices(memberId: ObjectId): Promise<DeleteNotice> {
        const result = await this.noticeModel.deleteMany({ noticeTargetId: memberId, noticeGroup: { $ne: "ADMIN" } }).exec()
        return result
    }

    async readAllNotices(memberId: ObjectId, input: ReadAll): Promise<ReadNotices> {
        const { listNotices } = input;
        console.log(listNotices)
        const promiseList = listNotices.map(async (id: string) => {
            const tempId = shapeIntoMongoObjectId(id)
            return await this.noticeModel.findOneAndUpdate({ _id: tempId }, { noticeRead: true }, { new: true }).exec()
        })
        return { list: await Promise.all(promiseList) };
    }

    async readTargetNotice(memberId: ObjectId, input: string): Promise<Notice> {
        const tempId = shapeIntoMongoObjectId(input)
        const exist = await this.noticeModel.findByIdAndUpdate({ _id: tempId, memberId }, { noticeRead: true }, { new: true }).exec();
        if (!exist) throw new BadRequestException(Message.NO_DATA_FOUND);
        return exist
    }

    //Admin
    async deleteTargetNotice(targetId: ObjectId): Promise<Notice> {
        const result = await this.noticeModel.findOneAndDelete({ _id: targetId, noticeGroup: NoticeGroup.ADMIN }).exec();
        return result
    }
}