import { ProductTypeEnum } from "../enums/ProductType.enum";

export const isProduct = (object: any) => {
    console.log(object);
    return Object.prototype.hasOwnProperty.call(object, "name")
        && Object.prototype.hasOwnProperty.call(object, "unitPrice")
        && Object.prototype.hasOwnProperty.call(object, "unitWeight")
        && Object.prototype.hasOwnProperty.call(object, "productType");
}

export interface ProductType {
    id?: string
    name: string,
    description: string,
    unitPrice: number,
    unitWeight: number,
    productType: ProductTypeEnum
}