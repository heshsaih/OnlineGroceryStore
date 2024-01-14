import { StatusCodes } from "http-status-codes";
import { api } from "../api/api";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { OrderType } from "../types/Order";
import { ProductType } from "../types/Product";

type OrderDetailsPropsType = {
    order: OrderType,
    fetchOrders: () => void,
    close: () => void
}

const OrderDetailsBodyComponent = ({ order, fetchOrders, close }: OrderDetailsPropsType) => {
    const sendData = async (copy: OrderType) => {
        try {
            const response = await api.updateOrderStatus(copy);
            if (response.status === StatusCodes.OK) {
                alert("Status has been updated!");
                fetchOrders();
                close();
            } else {
                alert("amogus");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const confirmOrder = async () => {
        const copy: OrderType = {...order, orderStatus: OrderStatusEnum.CONFIRMED};
        await sendData(copy);
    }

    const cancelOrder = async () => {
        const copy: OrderType = {...order, orderStatus: OrderStatusEnum.CANCELLED};
        await sendData(copy);
    }

    const completeOrder = async () => {
        const copy: OrderType = {...order, orderStatus: OrderStatusEnum.COMPLETED};
        await sendData(copy);
    }

    const parseProducts = () => {
        let result = "";
        order.orderedProducts.forEach(obj => result += `${obj.productName} ${obj.amount}, `);
        return result; 
    }
    return (
        <div className="modal-body">
            <h1>Order details</h1>
            <div className="container">
                { order.orderStatus === OrderStatusEnum.CONFIRMED && <><button onClick={completeOrder} className="button green">Complete</button><button onClick={cancelOrder} className="button red">Cancel</button></> }
                { order.orderStatus === OrderStatusEnum.NOT_CONFIRMED && <><button onClick={confirmOrder} className="button blue">Confirm</button><button onClick={cancelOrder} className="button red">Cancel</button></> }
            </div>
            <table>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>{order.id}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>{order.username}</td>
                </tr>
                <tr>
                    <td>E-mail</td>
                    <td>{order.email}</td>
                </tr>
                <tr>
                    <td>Phone number</td>
                    <td>{order.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Order status</td>
                        {order.orderStatus === OrderStatusEnum.NOT_CONFIRMED && <td style={{color: "grey"}}>{order.orderStatus}</td>}
                        {order.orderStatus === OrderStatusEnum.CONFIRMED && <td style={{color: "blue"}}>{order.orderStatus}</td>}
                        {order.orderStatus === OrderStatusEnum.COMPLETED && <td style={{color: "green"}}>{order.orderStatus}</td>}
                        {order.orderStatus === OrderStatusEnum.CANCELLED && <td style={{color: "red"}}>{order.orderStatus}</td>}
                </tr>
                <tr>
                    <td>Ordered products</td>
                    <td>{parseProducts()}</td>
                </tr>
            </table>
        </div>
    )
}

export default OrderDetailsBodyComponent;