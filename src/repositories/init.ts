import mongoose, { Error } from "mongoose";
import { ProductTypeEnum } from "../enums/ProductType.enum";
import { ProductType } from "../types/Product";
import { Product, createProduct } from "./ProductRepository"
import { OrderType } from "../types/Order";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { createOrder } from "./OrderRepository";

const products: ProductType[] = [
    {
        name: "Coca-cola 2L",
        description: "Sweet, fizzy drink, popular all over the world",
        unitPrice: 10.90,
        unitWeight: 2.11,
        productType: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Whole grain bread",
        description: "Bread full of different seeds",
        unitPrice: 6.99,
        unitWeight: 0.5,
        productType: ProductTypeEnum.BREAD
    },
    {
        name: "Lettuce",
        description: "Fresh lettuce, perfect for salads of sandwiches",
        unitPrice: 3.50,
        unitWeight: 0.25,
        productType: ProductTypeEnum.VEGETABLES
    },
    {
        name: "Papriker",
        description: "Hungarian dish, primarily consists of meat and paprika",
        unitPrice: 4.78,
        unitWeight: 0.310,
        productType: ProductTypeEnum.MEAT
    },
    {
        name: "Pigeons in tomato sauce",
        description: "Polish traditional dish. Meat and rice wrapped in a cabbage leaf",
        unitPrice: 8.75,
        unitWeight: 0.6,
        productType: ProductTypeEnum.MEAT
    },
    {
        name: "Apples",
        description: "Red, crispy and sweet apples, straight from an orchard",
        unitPrice: 3.0,
        unitWeight: 1.0,
        productType: ProductTypeEnum.FRUITS
    },
    {
        name: "Sparkling water",
        description: "Just regular water with bubbles",
        unitPrice: 2.0,
        unitWeight: 1.7,
        productType: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Tomato",
        description: "Juicy tomatoes",
        unitPrice: 12.50,
        unitWeight: 1.0,
        productType: ProductTypeEnum.FRUITS
    },
    {
        name: "Bananas",
        description: "Fresh, yellow bananas",
        unitPrice: 6.99,
        unitWeight: 1.0,
        productType: ProductTypeEnum.FRUITS 
    },
    {
        name: "Toast bread",
        description: "Toast bread, great for toasts",
        unitPrice: 5.84,
        unitWeight: 0.5,
        productType: ProductTypeEnum.BREAD
    }
];

const orders: OrderType[] = [
    {
        orderStatus: OrderStatusEnum.NOT_CONFIRMED,
        username: "ACzerwinska",
        email: "czerw32@onet.pl",
        phoneNumber: 553220351,
        orderedProducts: [
            {
                productName: "Bananas",
                amount: 3
            },
            {
                productName: "Apples",
                amount: 12
            }
        ]
    },
    {
        orderStatus: OrderStatusEnum.CONFIRMED,
        confirmDate: new Date(),
        username: "PMarszalek12",
        email: "peter32@gmail.pl",
        phoneNumber: 793528341,
        orderedProducts: [
            {
                productName: "Toast bread",
                amount: 1
            },
            {
                productName: "Sparkling water",
                amount: 3
            }
        ]
    },
    {
        orderStatus: OrderStatusEnum.CANCELLED,
        username: "mdabrowicz12",
        confirmDate: new Date(),
        email: "mateus32@yahoo.com",
        phoneNumber: 567567565,
        orderedProducts: [
            {
                productName: "Lettuce",
                amount: 2
            },
            {
                productName: "Coca-cola 2L",
                amount: 1
            }
        ]
    }
];

export const initData = async () => {
    await mongoose.connection.db.dropDatabase();
    for (const obj of products) {
        await createProduct(obj);
    }
    for (const obj of orders) {
        await createOrder(obj);
    }
};