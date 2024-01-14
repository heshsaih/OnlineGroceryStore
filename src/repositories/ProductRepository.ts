import mongoose, { model, Error } from "mongoose";
import { productSchema } from "../schemas/Product";
import { ProductType } from "../types/Product";
import { ProductTypeEnum } from "../enums/ProductType.enum";

export const Product = model<ProductType>("Product", productSchema);

export const findAllProducts = async () => {
    try {
        return await Product.find({});
    } catch (error) {
        console.log(error);
        return error as Error.MongooseServerSelectionError;
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
        if (error instanceof Error.DocumentNotFoundError) {
            return error as Error.DocumentNotFoundError;
        }
    }
}

export const createProduct = async (product: ProductType) => {
    try {
        return await new Product(product).save();
    } catch (error) {
        console.log(error)
        if (error instanceof Error.ValidationError) {
            return error as Error.ValidationError;
        }
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
        if (error instanceof Error.DocumentNotFoundError) {
            return error as Error.DocumentNotFoundError;
        } else if (error instanceof Error.ValidationError) {
            return error as Error.ValidationError;
        }
    }
}