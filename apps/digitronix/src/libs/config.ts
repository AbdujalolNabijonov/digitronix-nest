import { ObjectId } from "bson"
import * as path from "path"
import { v4 as uuidv4 } from "uuid"
import { T } from "./types/general"

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

export const avaibleArticleSorts = [
    "createdAt",
    "updatedAt",
    "articleLikes",
    "articleViews",
    "articleComments"
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

export const lookupFollowingMemberData = {
    $lookup: {
        from: "members",
        localField: "followingId",
        foreignField: "_id",
        as: "followingData"
    }
}

export const lookupFollowerMemberData = {
    $lookup: {
        from: "members",
        localField: "followerId",
        foreignField: "_id",
        as: "followerData"
    }
}

interface LookupAuthFollowed {
    followerId: T,
    followingId: string,
}
export const lookUpAuthMemberFollowed = (input: LookupAuthFollowed) => {
    const { followerId, followingId } = input
    return {
        $lookup: {
            from: "follows",
            let: {
                localFollowingId: followingId,
                localFollowerId: followerId,
                meFollowed: true
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$followingId", "$$localFollowingId"] }, { $eq: ["$followerId", "$$localFollowerId"] }
                            ]
                        }
                    },
                },
                {
                    $project: {
                        _id: 0,
                        followerId: 1,
                        followingId: 1,
                        myFollowing: "$$meFollowed"
                    }
                }
            ],
            as: "meFollowed"
        }
    }
}


export const lookupMyFavorities = () => {
    return {
        $lookup: {
            from: "products",
            let: {
                localLikeTargetId: "$likeTargetId"
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$_id", "$$localLikeTargetId"] }, { $eq: ["$productStatus", "ACTIVE"] }
                            ]
                        }
                    }
                }
            ],
            as: "favorityProduct"
        }
    }
}

export const lookupVisitedProducts = () => {
    return {
        $lookup: {
            from: "products",
            let: {
                localViewTargetId: "$viewTargetId",
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$_id", "$$localViewTargetId"] }, { $eq: ["$productStatus", "ACTIVE"] }
                            ]
                        }
                    }
                }
            ],
            as: "visitedProduct"
        }
    }
}
