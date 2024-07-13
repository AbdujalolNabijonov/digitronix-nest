import { registerEnumType } from "@nestjs/graphql";

export enum MemberGroup {
    USER = "USER",
    ADMIN = "ADMIN",
    COMPANY = "COMPANY",
    ASSISTANT = "ASSISTANT",
    DELIVER = "DELIVER"
}

registerEnumType(MemberGroup, { name: "memberGroup" })

export enum MemberStatus {
    ACTIVE = "ACTIVE",
    BLOCK = "BLOCK",
    DELETE = "DELETE"
}
registerEnumType(MemberStatus, { name: "memberStatus" })