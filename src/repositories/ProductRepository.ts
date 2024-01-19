import mongoose, { model, Error } from "mongoose";
import { productSchema } from "../schemas/Product";
import { ProductType } from "../types/Product";
import { ProductTypeEnum } from "../enums/ProductType.enum";
import { connectToMongoDB } from "./connection";

export const Product = model<ProductType>("Product", productSchema);

export const findAllProducts = async () => {
    try {
        return await Product.find({});
    } catch (error) {
        console.log(error);
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}

export const findProductById = async (id: string) => {
    try {
        const result = await Product.findById(id);
        if (result === null) {
            throw new Error.DocumentNotFoundError(`Product with ID ${id} does not exist`);
        }
        return result;
    } catch (error) {
        console.log(error);
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}

export const createProduct = async (product: ProductType) => {
    try {
        console.log("Inserting new product...");
        const response = await new Product(product).save();
        console.log("New product has been inserted!");
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}

export const updateProduct = async (id: string, newProduct: ProductType) => {
    try {
        await new Product(newProduct).validate();
        const result = await Product.findByIdAndUpdate(id, newProduct, { new: true });
        if (result === null) {
            throw new Error.DocumentNotFoundError(`Product with ID ${id} does not exist`);
        }
        return result;
    } catch (error) {
        console.log(error);
        if (error instanceof Error.MongooseServerSelectionError) {
            console.log("Trying to connect again...");
            await connectToMongoDB();
        }
        return error;
    }
}