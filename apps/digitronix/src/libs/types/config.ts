import { ObjectId } from "bson"


//CONSTS
export const avaibleMemberSorts = [
    "createdAt",
    "updatedAt",
    "memberLikes",
    "memberViews",
]

//reuseable 
export function shapeIntoMongoObjectId(target: any) {
    return typeof target === "string" ? new ObjectId(target) : target
}