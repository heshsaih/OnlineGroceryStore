import React, { useState } from "react";
import { OrderedProductType } from "../types/Product";
import { OrderType } from "../types/Order";
import { api } from "../api/api";
import { StatusCodes } from "http-status-codes";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import axios from "axios";

type CreateOrderPropsType = {
    orderedProducts: OrderedProductType[],
    close: () => void,
    clearBasket: () => void
}

const CreateOrderModalBody = ({ orderedProducts, close, clearBasket }: CreateOrderPropsType) => {
    const [newOrder, setNewOrder] = useState<OrderType>({
        username: "",
        email: "",
        phoneNumber: "",
        orderedProducts: orderedProducts,
        orderStatus: OrderStatusEnum.NOT_CONFIRMED
    });
    const changeNewOrder = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewOrder({...newOrder, [e.target.name]: e.target.value});
    }
    const calculateTotalPrice = () => {
        let result = 0;
        orderedProducts.forEach(obj => result += obj.amount * obj.unitPrice);
        return result.toFixed(2);
    }

    const createNewOrder = async () => {
        console.log(newOrder);
        try {
            const response = await api.createOrder(newOrder);
            if (response.status === StatusCodes.OK) {
                alert("New order has been created successfully");
                clearBasket();
                close();
            } else if (axios.isAxiosError(response)) {
                let responseMessage = `${response.message} and message:\n\n`;
                Object.keys(response.response?.data.errors).forEach(key => responseMessage += response.response?.data.errors[key].message + "\n");
                alert(responseMessage);
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal-body">
            <h1 className="modal-heading">Place an order</h1>
            <div className="container inputs">
                <label htmlFor="username">Username</label>
                <input onChange={e => changeNewOrder(e)} type="text" name="username" id="username" className="text-input"/>
                <label htmlFor="email">E-mail</label>
                <input onChange={e => changeNewOrder(e)} type="text" name="email" id="email" className="text-input"/>
                <label htmlFor="phoneNumber">Phone number</label>
                <input onChange={e => changeNewOrder(e)} type="text" name="phoneNumber" id="phoneNumber" className="text-input"/>
            </div>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Price</th>
                </tr>
                { orderedProducts.map((x, _i) => {
                    return (
                        <tr>
                            <td>{x.productName}</td>
                            <td>{x.amount}</td>
                            <td>{(x.amount * x.unitPrice).toFixed(2)}</td>
                        </tr>
                    )
                }) }
            </table>
            <h3>Total</h3>
            <p>{calculateTotalPrice()}</p>
            <button onClick={createNewOrder} className="button blue">Place an order</button>
        </div>
    )
}

export default CreateOrderModalBody;