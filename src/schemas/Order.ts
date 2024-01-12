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
    quantity: {
        type: Number,
        min: [1, OrderedProductValidationMessages.QUANTITY_LESS_THAN_ONE],
        required: [true, OrderedProductValidationMessages.QUANTITY_REQUIRED]
    }
});

export const orderSchema = new Schema<OrderType>({
    approvalDate: Date,
    orderStatus: {
        type: String,
        enum: OrderStatusEnum,
        required: [true, OrderValidationMessages.STATUS_REQUIRED]
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
        type: String,
        minlength: [9, OrderValidationMessages.PHONE_NUMBER_LENGTH],
        maxlength: [9, OrderValidationMessages.PHONE_NUMBER_LENGTH],
        required: [true, OrderValidationMessages.PHONE_NUMBER_REQUIRED]
    },
    orderedProducts: [{
        type: OrderedProductSchema,
        required: [true, OrderValidationMessages.ORDERED_PRODUCT_REQUIRED]
    }]
});