import { ObjectId } from "bson"
import * as path from "path"
import {v4 as uuidv4} from "uuid"

//CONSTS
export const avaibleMemberSorts = [
    "createdAt",
    "updatedAt",
    "memberLikes",
    "memberViews",
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

export function getSerialNumber(fileName:string){
    const extention = path.parse(fileName).ext;
    return uuidv4()+extention
}

