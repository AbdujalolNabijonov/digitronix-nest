import { registerEnumType } from "@nestjs/graphql";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    DELETED = "DELETED"
}
registerEnumType(ProductStatus, { name: "ProductStatus" })

export enum ProductType {
    LAPTOP = "LAPTOP",
    DESKTOP = "DESKTOP",
    PERIPHERAL = "PERIPHERAL"
}
registerEnumType(ProductType, { name: "ProductType" })

export enum PeripheralCategory {
    GRAPHICS = "GRAPHICS",
    KEYBOARD = "KEYBOARD",
    MICE = "MICE",
    AUDIO = "AUDIO",
    CONTROLLER = "CONTROLLER",
    GAMINGCHAIR = "GAMINGCHAIR"
}
registerEnumType(PeripheralCategory, { name: "PeripheralCategory" })

export enum ProductCompany {
    MSI = "MSI",
    ASUS = "ASUS",
    APPLE = "APPLE",
    RAZER = "RAZER",
    LENOVO = "LENOVO"
}
registerEnumType(ProductCompany, { name: "ProductCompany" })

export enum ProcessorType {
    INTEL = "INTEL",
    AMD = "AMD",
    ARM = "ARM"
}
registerEnumType(ProcessorType, { name: "ProcessorType" })

export enum ProcessorGen {
    GEN_14 = "14TH GEN",
    GEN_13 = "13TH GEN",
    GEN_12 = "12TH GEN",
    GEN_11 = "11TH GEN",
    GEN_10 = "10TH GEN",
    GEN_9 = "9TH GEN",
    Ryzen_8000 = "Ryzen™ 8000",
    Ryzen_7000 = "Ryzen™ 7000",
}
registerEnumType(ProcessorGen, { name: "ProcessorGen" })

export enum CoreList {
    INTEL_CORE_i9 = "INTEL CORE i9",
    INTEL_CORE_i7 = "INTEL CORE i7",
    INTEL_CORE_i5 = "INTEL CORE i5",
    INTEL_CORE_i3 = "INTEL CORE i3",
    RYZEN_9 = "RYZEN 9",
    RYZEN_7 = "RYZEN 7",
    RYZEN_5 = "RYZEN 5",
    RYZEN_3 = "RYZEN 3",
    M1 = "M1",
    M2 = "M2",
    M3 = "M3",
    M1_PRO = "M1 PRO",
    M2_PRO = "M2 PRO",
    M3_PRO = "M3 PRO",
    M1_MAX = "M1 MAX",
    M2_MAX = "M2 MAX",
    M3_MAX = "M3 MAX",
}
registerEnumType(CoreList, { name: "CoreList" })

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
    META = "META"
}
registerEnumType(ProductSeries, { name: "ProductSeries" })

export enum GraphicsSeries {
    GeForce_RTX_40 = "GeForce RTX™ 40",
    GeForce_RTX_30 = "GeForce RTX™ 30",
    GeForce_RTX_20 = "GeForce RTX™ 20",
    GeForce_GTX_16 = "GeForce® GTX 16",
    AMD_Radeon_6000M = "AMD Radeon™ 6000M"
}
registerEnumType(GraphicsSeries, { name: "GraphicsSeries" })

export enum GraphicsType {
    GeForce_RTX_4090 = "GeForce RTX™ 4090",
    GeForce_RTX_4080 = "GeForce RTX™ 4080",
    GeForce_RTX_4070 = "GeForce RTX™ 4070",
    GeForce_RTX_4060 = "GeForce RTX™ 4060",
    GeForce_RTX_4050 = "GeForce RTX™ 4050",
    GeForce_RTX_3070_TI = "GeForce RTX™ 3070 TI",
    GeForce_RTX_3070 = "GeForce RTX™ 3070",
    GeForce_RTX_3060 = "GeForce RTX™ 3060",
    GeForce_RTX_3050_TI = "GeForce RTX™ 3050 TI",
    GeForce_RTX_3050 = "GeForce RTX™ 3050",
    GeForce_RTX_2080_SUPER = "GeForce RTX™ 2080 SUPER",
    GeForce_RTX_2080 = "GeForce RTX™ 2080",
    GeForce_RTX_2070_SUPER = "GeForce RTX™ 2070 SUPER",
    GeForce_RTX_2070 = "GeForce RTX™ 2070",
    GeForce_RTX_2060 = "GeForce RTX™ 2060",
    GeForce_RTX_2050 = "GeForce RTX™ 2050",
    GeForce_GTX_1660_TI = "GeForce GTX™ 1660 TI",
    GeForce_GTX_1650 = "GeForce GTX™ 1650",
}
registerEnumType(GraphicsType, { name: "GraphicsType" })

export enum RgbType {
    Per_Key_RGB_Mystic_Light = "Per-Key RGB Mystic Light",
    Single_Color_Backlight = "Single-Color Backlight",
    Rainbow_RGB = "Rainbow RGB",
    RGB = "RGB"
}

registerEnumType(RgbType, { name: "RgbType" })

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
