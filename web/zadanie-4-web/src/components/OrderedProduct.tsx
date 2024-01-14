import { OrderedProductType } from "../types/Product";

type OrderedProductPropsType = {
    orderedProduct: OrderedProductType, 
    addOrderedProduct: (product: OrderedProductType) => void, 
    removeOrderedProduct: (product: OrderedProductType) => void
}

const OrderedProductComponent = ({ orderedProduct, addOrderedProduct, removeOrderedProduct }: OrderedProductPropsType) => {
    const increaseAmount = () => {
        addOrderedProduct({
            productName: orderedProduct.productName,
            amount: orderedProduct.amount + 1,
            unitPrice: orderedProduct.unitPrice
        });
    }

    const decreaseAmount = () => {
        if (orderedProduct.amount > 1) {
            addOrderedProduct({
                productName: orderedProduct.productName,
                amount: orderedProduct.amount - 1,
                unitPrice: orderedProduct.unitPrice
            });
        }
    }
    const removeProduct = () => {
        removeOrderedProduct({...orderedProduct});
    }
    return (
        <div className="ordered-product">
            <div className="ordered-product-data">
                <p>{orderedProduct.productName}</p>
                <p>{orderedProduct.amount}</p>
            </div>
            <div className="ordered-product-manipulation">
                <button onClick={decreaseAmount} className="button blue">-</button>
                <button onClick={increaseAmount} className="button green">+</button>
                <button onClick={e => {
                    e.stopPropagation();
                    removeProduct();
                }} className="button red">x</button>
            </div>
        </div>
    );
}

export default OrderedProductComponent;