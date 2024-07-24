import { registerEnumType } from "@nestjs/graphql";

export enum CommentStatus {
    ACTIVE = "ACTIVE",
    DELETE = "DELETE"
}
registerEnumType(CommentStatus, { name: "CommentStatus" })

export enum CommentGroup {
    MEMBER = 'MEMBER',
    ARTICLE = 'ARTICLE',
    LAPTOP = "LAPTOP",
    DESKTOP = "DESKTOP",
    PERIPHERAL = "PERIPHERAL"
}
registerEnumType(CommentGroup, { name: "CommentGroup" })