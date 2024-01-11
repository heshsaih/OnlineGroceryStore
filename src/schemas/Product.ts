import { Schema, Types } from "mongoose";
import { ProductType } from "../types/Product";
import { ProductTypeEnum } from "../enums/ProductType.enum";

export const productSchema = new Schema<ProductType>({
    name: String,
    description: String,
    unitPrice: Types.Decimal128,
    unitWeight: Types.Decimal128,
    type: String
});