import { useState } from "react";
import { ProductType } from "../types/Product";
import ModalComponent from "./Modal";



const ProductComponent = ({ product }: { product: ProductType }) => {
    const ProductModalBody = ({ product }: { product: ProductType }) => {
        return (
            <div className="modal-body">
                <h1>Product details</h1>
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
            </div>
        )
    }

    const [displayDetails, setDisplayDetails] = useState(false);

    return (
        <div id={product.id} className="product" onClick={() => setDisplayDetails(true)}>
            <h2>{product.name}</h2>
            <h3>{product.productType}</h3>
            <p>{product.description}</p>
            { displayDetails && <ModalComponent close={(e) => {
                e.stopPropagation();
                setDisplayDetails(false);
            }} Body={<ProductModalBody product={product}></ProductModalBody>}></ModalComponent> }
        </div>
    )
}

export default ProductComponent;