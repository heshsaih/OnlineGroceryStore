import { model, Error, MongooseError} from "mongoose";
import { orderSchema } from "../schemas/Order";
import { OrderType } from "../types/Order";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";

const Order = model<OrderType>("Order", orderSchema);

export const findAllOrders = async () => {
    try {
        return await Order.find({});
    } catch (error) {
        return error as Error.MongooseServerSelectionError;
    }
}

export const findOrderById = async(id: string) => {
    try {
        const result = await Order.findById(id);
        if (result === null) {
            throw new Error.DocumentNotFoundError(`Order with ID ${id} does not exist`);
        }
        return result;
    } catch (error) {
        if (error instanceof Error.DocumentNotFoundError) {
            return error as Error.DocumentNotFoundError;
        }
    }
}

export const createOrder = async (newOrder: OrderType) => {
    try {
        return await new Order(newOrder).save();
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return error as Error.ValidationError;
        }
    }
}

export const updateOrderStatus = async (id: string, newStatus: OrderStatusEnum) => {
    try {
        const update = await Order.findById(id).lean() as OrderType;
        if (update === null) {
            throw new Error.DocumentNotFoundError(`Order with ID ${id} does not exist`);
        }
        update.orderStatus = newStatus;
        await new Order(update).validate();
        return await Order.findByIdAndUpdate(id, update, { new: true });
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return error as Error.ValidationError;
        } else if (error instanceof Error.DocumentNotFoundError) {
            return error as Error.DocumentNotFoundError
        }
    }
}