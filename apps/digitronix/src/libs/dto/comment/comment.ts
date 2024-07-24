import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CommentGroup, CommentStatus } from "../../enums/comment.enum";
import { Member } from "../member/member";
import { MeLiked } from "../like/like";

@ObjectType()
export class Comment {
    @Field(() => String)
    _id: ObjectId

    @Field(() => CommentStatus)
    commentStatus: string

    @Field(() => CommentGroup)
    commentGroup: string

    @Field(() => String)
    commentContent: string

    @Field(() => String)
    commentTargetId: ObjectId

    @Field(() => String)
    memberId: ObjectId

    @Field(() => Number)
    commentRank: number

    @Field(() => Number)
    commentLikes: number
    
    @Field(() => Member, { nullable: true })
    memberData?: Member

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[]

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
class TotalComments {
    @Field(() => Number, { nullable: true })
    total?: number
}

@ObjectType()
export class Comments {
    @Field(() => [Comment])
    list: Comment[]

    @Field(() => [TotalComments])
    metaCounter: TotalComments[]
}
