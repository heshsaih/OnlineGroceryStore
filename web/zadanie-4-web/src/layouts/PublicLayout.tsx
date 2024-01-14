import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { OrderedProductType } from "../types/Product";

const PublicLayout = ({ Component }: { Component: React.FC }) => {
    const [orderedProducts, setOrderedProducts] = useState<OrderedProductType[]>([]);
    const addOrderedProduct = (newProduct: OrderedProductType) => {
        if (orderedProducts.filter(obj => obj.productName === newProduct.productName).length === 0) {
            setOrderedProducts([...orderedProducts, newProduct]);
        } else {
            const copy = [...orderedProducts];
            for (let i = 0; i < orderedProducts.length; i++) {
                if (copy[i].productName === newProduct.productName) {
                    copy[i].amount = newProduct.amount;
                    break;
                }
            }
            setOrderedProducts(copy);
        }
    }

    const removeOrderedProduct = (product: OrderedProductType) => {
        setOrderedProducts([...orderedProducts].filter(obj => obj.productName !== product.productName));
    }
    useEffect(() => console.log(orderedProducts), [orderedProducts]);
    return (
        <div id="public-layout">
            <Navbar orderedProducts={orderedProducts} addOrderedProduct={addOrderedProduct} removeOrderedProduct={removeOrderedProduct} ></Navbar>
            <div id="component">
                <Component addOrderedProduct={addOrderedProduct}></Component>
            </div>
        </div>
    )
}

export default PublicLayout;