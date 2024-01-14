import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { CreateProductType, ProductType } from "../../types/Product";
import ProductComponent from "../../components/Product";
import { ProductTypeEnum } from "../../enums/ProductType.enum";
import { apiWithConfig } from "../../api/api.config";
import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";

const ProductsPageComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedProducts, setFetchedProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [filter, setFilter] = useState("");
    const [newProduct, setNewProduct] = useState<CreateProductType>({
        name: "",
        description: "",
        unitPrice: 0,
        unitWeight: 0,
        productType: ProductTypeEnum.BREAD
    });
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await api.getAllProducts();
            setFetchedProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateNewProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    }

    const filterProducts = () => {
        setFilteredProducts(fetchedProducts.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase())))
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => filterProducts(), [filter, fetchedProducts]);

    const createNewProduct = async () => {
        try {
            const response = await api.createProduct(newProduct);
            if (response.status === StatusCodes.OK) {
                alert("New product has been created successfully");
                await fetchProducts();
            } else {
                alert("There was an error");
                console.log(response.request?.response)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="component-body" id="products-component">
            <div className="side-panel">
                <h2>Create product</h2>
                <div className="container" id="create-product-inputs">
                    <label htmlFor="name">Name</label>
                    <input onChange={e => updateNewProduct(e)} value={newProduct.name} placeholder="Enter name" type="text" name="name" id="name" className="text-input"/>
                    <label htmlFor="description">Description</label>
                    <input onChange={e => updateNewProduct(e)} value={newProduct.description} placeholder="Enter description" type="text" name="description" id="description" className="text-input"/>
                    <label htmlFor="unitPrice">Unit price</label>
                    <input onChange={e => updateNewProduct(e)} value={newProduct.unitPrice} placeholder="Enter unit price" type="text" name="unitPrice" id="unitPrice" className="text-input"/>
                    <label htmlFor="unitWeight">Unit weight</label>
                    <input onChange={e => updateNewProduct(e)} value={newProduct.unitWeight} placeholder="Enter unit weight" type="text" name="unitWeight" id="unitWeight" className="text-input"/>
                    <label htmlFor="productType">Product type</label>
                    <select onChange={e => updateNewProduct(e)} name="productType" id="productType" className="select-input">
                        {Object.keys(ProductTypeEnum).map((x, _i) => <option value={x}>{ProductTypeEnum[x]}</option>)}
                    </select>
                    <button onClick={createNewProduct} className="button blue">Create product</button>
                </div>
            </div>
            <div className="content" id="products">
                <div className="container" id="elements">
                    <h1>Available products</h1>
                    <input onChange={e => setFilter(e.target.value)} type="text" className="text-input" placeholder="Filter products"/>
                </div>
                {isLoading && <p>Loading</p>}
                {!isLoading && filteredProducts && filteredProducts.map((x, i) => <ProductComponent key={i} product={x}></ProductComponent>)}
            </div>
        </div>
    );
}

export default ProductsPageComponent;