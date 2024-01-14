import { useState } from "react";
import { OrderedProductType } from "../types/Product";
import OrderedProductComponent from "./OrderedProduct";
import ModalComponent from "./Modal";
import CreateOrderModalBody from "./CreateOrderModalBody";

type DropDownPropsType = {
    orderedProducts: OrderedProductType[], 
    addOrderedProduct: (product: OrderedProductType) => void, 
    removeOrderedProduct: (product: OrderedProductType) => void
}

const DropDownComponent = ({ orderedProducts, addOrderedProduct, removeOrderedProduct }: DropDownPropsType) => {
    const [displayCreateModal, setDisplayCreateModal] = useState(false);
    const showModal = () => setDisplayCreateModal(true);
    const closeModal = () => setDisplayCreateModal(false);
    return (
        <div id="drop-down" className="show-anim">
            <h3>Cart</h3>
            <div className="ordered-products">
                { orderedProducts.length > 0 && orderedProducts.map((x, i) => <OrderedProductComponent key={i} orderedProduct={x} addOrderedProduct={addOrderedProduct} removeOrderedProduct={removeOrderedProduct}></OrderedProductComponent>) }
                { orderedProducts.length === 0 && <p>Cart is empty</p> }
            </div>
            <button onClick={showModal} className="button blue" disabled={orderedProducts.length === 0}>Checkout</button>
            {displayCreateModal ? <ModalComponent close={closeModal} Body={<CreateOrderModalBody close={closeModal} orderedProducts={orderedProducts}></CreateOrderModalBody>}></ModalComponent> : <></>}
        </div>
    )
}

export default DropDownComponent;