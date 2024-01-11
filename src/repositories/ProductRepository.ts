import mongoose, { model } from "mongoose";
import { productSchema } from "../schemas/Product";
import { ProductType } from "../types/Product";
import { ProductTypeEnum } from "../enums/ProductType.enum";

export const Product = model<ProductType>("Product", productSchema);

export const findAllProducts = async () => {
    return await Product.find({});
}

export const findProductById = async (id: string) => {
    return await Product.findById(id);
}

export const createProduct = async (product: ProductType) => {
    return await new Product(product).save();
}

export const updateProduct = async (id: string, newProduct: ProductType) => {
    return await Product.findByIdAndUpdate(id, newProduct);
}