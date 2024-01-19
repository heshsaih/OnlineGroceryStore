import {Error, model} from "mongoose";
import {orderSchema} from "../schemas/Order";
import {OrderType} from "../types/Order";
import {OrderStatusEnum} from "../enums/OrderStatus.enum";
import {connectToMongoDB} from "./connection";

const Order = model<OrderType>("Order", orderSchema);

export const findAllOrders = async () => {
    try {
        return await Order.find({});
    } catch (error) {
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}

export const findOrderById = async (id: string) => {
    try {
        const result = await Order.findById(id);
        if (result === null) {
            throw new Error.DocumentNotFoundError(`Order with ID ${id} does not exist`);
        }
        return result;
    } catch (error) {
         if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}

export const createOrder = async (newOrder: OrderType) => {
    try {
        return await new Order(newOrder).save();
    } catch (error) {
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}

export const updateOrderStatus = async (id: string, newStatus: OrderStatusEnum) => {
    try {
        const update = await Order.findById(id).lean() as OrderType;
        let errorMessage: string = "";
        if (update === null) {
            throw new Error.DocumentNotFoundError(`Order with ID ${id} does not exist`);
        } else if (update.orderStatus === OrderStatusEnum.CANCELLED) {
            errorMessage = "Can't change status of a cancelled order";
        } else if (newStatus === OrderStatusEnum.NOT_CONFIRMED) {
            errorMessage = "Can't change status to \"Not confirmed\""
        } else if ((update.orderStatus === OrderStatusEnum.COMPLETED) && (newStatus === OrderStatusEnum.CONFIRMED)) {
            errorMessage = "Can't change status from \"Completed\" to \"Confirmed\"";
        }
        if (errorMessage.length > 0) {
            const error = new Error.ValidationError();
            error.errors = {
                newStatus: {
                    name: "ValidatorError",
                    message: errorMessage,
                    properties: {
                        message: "",
                        type: "",
                        path: ""
                    },
                    value: "",
                    kind: "",
                    path: ""
                }
            }
            throw error;
        }
        update.orderStatus = newStatus;
        if (update.orderStatus === OrderStatusEnum.CONFIRMED) {
            update.confirmDate = new Date();
        }
        await new Order(update).validate();
        return await Order.findByIdAndUpdate(id, update, { new: true });
    } catch (error) {
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}