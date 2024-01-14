import { Schema, Types } from "mongoose";
import { ProductType } from "../types/Product";
import { ProductTypeEnum } from "../enums/ProductType.enum";
import { ProductValidationMessages } from "../enums/ProductValidationMessage.enum";

export const productSchema = new Schema<ProductType>({
    name: {
        type: String,
        minlength: [3, ProductValidationMessages.NAME_TOO_SHORT],
        required: [true, ProductValidationMessages.NAME_REQUIRED]
    },
    description: {
        type: String,
        required: false
    },
    unitPrice: {
        type: Number,
        min: [0.01, ProductValidationMessages.PRICE_NEGATIVE],
        required: [true, ProductValidationMessages.PRICE_REQUIRED]
    },
    unitWeight: {
        type: Number,
        min: [0.1, ProductValidationMessages.WEIGHT_NEGATIVE],
        required: [true, ProductValidationMessages.WEIGHT_REQUIRED]
    },
    productType: {
        type: String,
        enum: ProductTypeEnum,
        required: [true, ProductValidationMessages.PRODUCT_TYPE_REQUIRED]
    }
});

productSchema.set("toJSON", { virtuals: true })