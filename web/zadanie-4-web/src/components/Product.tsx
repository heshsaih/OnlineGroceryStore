import { useEffect, useState } from "react";
import { OrderedProductType, ProductType } from "../types/Product";
import ModalComponent from "./Modal";
import ProductModalBody from "./ProductModalBody";

type ProductPropsType = {
    product: ProductType, 
    addOrderedProduct: (newProduct: OrderedProductType) => void,
    fetchProducts: () => void
}

const ProductComponent = ({ product, addOrderedProduct, fetchProducts }: ProductPropsType) => {
    const [displayDetails, setDisplayDetails] = useState(false);
    const [newProduct, setNewProduct] = useState<OrderedProductType>({
        productName: product.name,
        amount: 1,
        unitPrice: product.unitPrice
    });
    const setAmount = (e: React.ChangeEvent<HTMLInputElement>) => setNewProduct({...newProduct, amount: Number.parseInt(e.target.value)})
    const addProduct = () => {
        addOrderedProduct(newProduct);
    }

    return (
        <div id={product.id} className="product" onClick={() => setDisplayDetails(true)}>
            <div className="details">
                <h2>{product.name}</h2>
                <h3>{product.unitPrice}</h3>
                <h3>{product.productType}</h3>
                <p>{product.description}</p>
            </div>
            <div className="product-buttons">
                <input min="1" value={newProduct.amount} onChange={e => setAmount(e)} onClick={e => e.stopPropagation()} type="number" name="amount" id="amount" className="text-input number"/>
                <button className="button green" onClick={e => {
                    e.stopPropagation();
                    addProduct();
                }}>+</button>
            </div>
            { displayDetails && <ModalComponent close={(e) => {
                e.stopPropagation();
                setDisplayDetails(false);
            }} Body={<ProductModalBody fetchProducts={fetchProducts} close={() => setDisplayDetails(false)} product={product}></ProductModalBody>}></ModalComponent> }
        </div>
    )
}

export default ProductComponent;