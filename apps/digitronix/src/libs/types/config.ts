import { ObjectId } from "bson"
import * as path from "path"
import { v4 as uuidv4 } from "uuid"
import { T } from "./general"

//CONSTS
export const avaibleMemberSorts = [
    "createdAt",
    "updatedAt",
    "memberLikes",
    "memberViews",
]

export const avaibleProductSorts = [
    "createdAt",
    "updatedAt",
    "productRank",
    "productViews",
    "productLikes"
]
export const avaibleMimeType = [
    "image/jpg",
    "image/jpeg",
    "image/png"
]


//reuseable 
export function shapeIntoMongoObjectId(target: any) {
    return typeof target === "string" ? new ObjectId(target) : target
}

export function getSerialNumber(fileName: string) {
    const extention = path.parse(fileName).ext;
    return uuidv4() + extention
}


//Complex Query
export const lookupAuthMemberLiked = (memberId: T, likeTargetId: string = "$_id") => {
    return {
        $lookup: {
            from: "likes",
            let: {
                localMemberId: memberId,
                localLikeTargetId: likeTargetId,
                localMyFavourite: true
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [{ $eq: ["$memberId", "$$localMemberId"] }, { $eq: ["$likeTargetId", "$$localLikeTargetId"] }]
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        likeTargetId: 1,
                        memberId: 1,
                        myFavorite: "$$localMyFavourite"
                    }
                }
            ],
            as: "meLiked"
        }
    }
}

export const lookUpMember = {
    $lookup: {
        from: "members",
        localField: "memberId",
        foreignField: "_id",
        as: "memberData"
    }
}

