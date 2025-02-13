import { registerEnumType } from "@nestjs/graphql";

export enum MemberGroup {
    USER = "USER",
    ADMIN = "ADMIN",
    RETAILER = "RETAILER"
}
registerEnumType(MemberGroup, { name: "MemberGroup" })

export enum MemberStatus {
    ACTIVE = "ACTIVE",
    BLOCK = "BLOCK",
    DELETE = "DELETE"
}
registerEnumType(MemberStatus, { name: "MemberStatus" })