import { useState } from "react";
import { ProductType } from "../types/Product"
import ModifyProductModalBodyComponent from "./ModifyProductModalBody";
import ModalComponent from "./Modal";

type ProductModalPropsType = {
    product: ProductType, 
    close: () => void,
    fetchProducts: () => void
}

const ProductModalBodyComponent = ({ product, close, fetchProducts }: ProductModalPropsType) => {
    const [displayEditProduct, setDisplayEditProduct] = useState(false);
    const showEdit = () => setDisplayEditProduct(true);
    const closeEdit = () => setDisplayEditProduct(false);
    return (
        <div className="modal-body">
            <h1 className="modal-heading">Product details</h1>
            <table>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>{product.id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{product.name}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>{product.productType}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{product.description}</td>
                </tr>
                <tr>
                    <td>Unit price</td>
                    <td>{product.unitPrice}</td>
                </tr>
                <tr>
                    <td>Unit weight</td>
                    <td>{product.unitWeight}</td>
                </tr>
            </table>
            <button onClick={showEdit} className="button blue">Edit product</button>
            { displayEditProduct && <ModalComponent close={closeEdit}  Body={<ModifyProductModalBodyComponent fetchProducts={fetchProducts} closeParent={close} close={closeEdit} product={product}></ModifyProductModalBodyComponent>}></ModalComponent> }
        </div>
    )
}

export default ProductModalBodyComponent;