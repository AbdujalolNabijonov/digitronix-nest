import { registerEnumType } from "@nestjs/graphql";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    DELETE = "DELETE"
}
registerEnumType(ProductStatus, { name: "ProductStatus" })

export enum ProductCategory {
    LAPTOP = "LAPTOP",
    DESKTOP = "DESKTOP",
    GRAPHICS = "GRAPHICS",
    KEYBOARD = "KEYBOARD",
    MICE = "MICE",
    CHAIR = "CHAIR"
}
registerEnumType(ProductCategory, { name: "ProductCategory" })


export enum ProductBrand {
    MSI = "MSI",
    ASUS = "ASUS",
    APPLE = "APPLE",
    RAZER = "RAZER",
    LENOVO = "LENOVO",
    NVIDIA = "NVIDIA"
}
registerEnumType(ProductBrand, { name: "ProductBrand" })



export enum ProductSeries {
    TITAN = "TITAN",
    STEALTH = "STEALTH",
    RAIDER = "RAIDER",
    VECTOR = "VECTOR",
    AEGIS = "AEGIS",
    MACBOOK = "MACBOOK",
    INFINITE = "INFINITE",
    TRIDENT = "TIDENT",
    CODEX = "CODEX",
    META = "META",
    SUPRIM = "SUPRIM",
    GAMING = "GAMING",
    VENTUS = "VENTUS",
    SHADOW = "SHADOW"

}
registerEnumType(ProductSeries, { name: "ProductSeries" })



export enum Connectivity {
    WIRE = "WIRE",
    WIRELESS = "WIRELESS",
    BLUETOOTH = "BLUETOOTH"
}
registerEnumType(Connectivity, { name: "Connectivity" })

export enum MaterialType {
    FABRIC = "FABRIC",
    LEATHER = "LEATHER",
    MESH = "MESH"
}
registerEnumType(MaterialType, { name: "MaterialType" })

export enum ProductLabel {
    NEW = "NEW",
    HOT = "HOT"
}
registerEnumType(ProductLabel, { name: "ProductLabel" })