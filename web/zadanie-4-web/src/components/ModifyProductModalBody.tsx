import { useState } from "react";
import { ProductType } from "../types/Product";
import { ProductTypeEnum } from "../enums/ProductType.enum";
import { api } from "../api/api";
import { StatusCodes } from "http-status-codes";

type ModifyProductModalPropsType = {
    product: ProductType, 
    close: () => void,
    closeParent: () => void,
    fetchProducts: () => void
}

const ModifyProductModalBodyComponent = ({ product, close, closeParent, fetchProducts }: ModifyProductModalPropsType) => {
    const [editProduct, setProduct] = useState<ProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        unitPrice: product.unitPrice,
        unitWeight: product.unitWeight,
        productType: product.productType
    });

    const changeEditProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProduct({...editProduct, [e.target.name]: e.target.value});
    }

    const updateProduct = async () => {
        try {
            const response = await api.updateProduct(editProduct);
            if (response.status === StatusCodes.OK) {
                alert("Product has been modified successfully");
                close();
                closeParent();
                fetchProducts();
            } else {
                let responseMessage = `${response.message} and message:\n\n`;
                Object.keys(response.response.data.errors).forEach(key => responseMessage += response.response.data.errors[key].message + "\n");
                alert(responseMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="modal-body">
            <h1>Edit product</h1>
            <label htmlFor="name">Product name</label>
            <input value={editProduct.name} onChange={e => changeEditProduct(e)} type="text" name="name" id="name" className="text-input"/>
            <label htmlFor="username">Description</label>
            <input value={editProduct.description} onChange={e => changeEditProduct(e)} type="text" name="description" id="description" className="text-input"/>
            <label htmlFor="username">Unit price</label>
            <input value={editProduct.unitPrice} onChange={e => changeEditProduct(e)} type="text" name="unitPrice" id="unitPrice" className="text-input"/>
            <label htmlFor="username">Unit weight</label>
            <input value={editProduct.unitWeight} onChange={e => changeEditProduct(e)} type="text" name="unitWeight" id="unitWeight" className="text-input"/>
            <label htmlFor="productType">Product type</label>
            <select onChange={e => changeEditProduct(e)} value={editProduct.productType} className="select-input" name="productType" id="productType">
                {Object.values(ProductTypeEnum).map((x, _i) => <option value={x}>{x}</option>)}
            </select>
            <button onClick={updateProduct} className="button blue">Confirm</button>
        </div>
    )
}

export default ModifyProductModalBodyComponent;