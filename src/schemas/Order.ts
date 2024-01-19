import { Schema } from "mongoose";
import { OrderType, OrderedProductsType } from "../types/Order";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { OrderValidationMessages } from "../enums/OrderValidationMessages";
import { OrderedProductValidationMessages } from "../enums/OrderedProductValidationMessages";
import { ProductTypeEnum } from "../enums/ProductType.enum";

const OrderedProductSchema = new Schema<OrderedProductsType>({
    productName: {
        type: String,
        minlength: [3, OrderedProductValidationMessages.PRODUCT_NAME_TOO_SHORT],
        required: [true, OrderedProductValidationMessages.PRODUCT_NAME_REQUIRED]
    },
    amount: {
        type: Number,
        min: [1, OrderedProductValidationMessages.AMOUNT_LESS_THAN_ONE],
        required: [true, OrderedProductValidationMessages.AMOUNT_REQUIRED]
    }
});

export const orderSchema = new Schema<OrderType>({
    confirmDate: {
        type: Date,
        required: false
    },
    orderStatus: {
        type: String,
        enum: OrderStatusEnum,
        required: true
    },
    username: {
        type: String,
        minlength: [3, OrderValidationMessages.USERNAME_TOO_SHORT],
        maxlength: [20, OrderValidationMessages.USERNAME_TOO_LONG],
        required: [true, OrderValidationMessages.USERNAME_REQUIRED]
    },
    email: {
        type: String,
        required: [true, OrderValidationMessages.EMAIL_REQUIRED],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, OrderValidationMessages.EMAIL_WRONG_SYNTAX]
    },
    phoneNumber: {
        type: Number,
        min: [100000000, OrderValidationMessages.PHONE_NUMBER_LENGTH],
        max: [999999999, OrderValidationMessages.PHONE_NUMBER_LENGTH],
        required: [true, OrderValidationMessages.PHONE_NUMBER_REQUIRED]
    },
    orderedProducts: [{
        type: OrderedProductSchema,
        required: [true, OrderValidationMessages.ORDERED_PRODUCT_REQUIRED]
    }]
});

orderSchema.set("toJSON", { virtuals: true })