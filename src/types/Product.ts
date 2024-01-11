import { ProductTypeEnum } from "../enums/ProductType.enum";

export interface ProductType {
    id?: string
    name: string,
    description: string,
    unitPrice: number,
    unitWeight: number,
    type: ProductTypeEnum
}