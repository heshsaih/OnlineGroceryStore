import { useState } from "react";
import { OrderType } from "../types/Order";
import ModalComponent from "./Modal";
import OrderDetailsBodyComponent from "./OrderDetailsBody";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";

const OrderComponent = ({ order, fetchOrders }: { order: OrderType, fetchOrders: () => void}) => {
    const [displayDetails, setDisplayDetails] = useState(false);
    const showDetails = () => setDisplayDetails(true);
    const hideDetails = () => setDisplayDetails(false);
    return (
        <div className="order" onClick={showDetails}>
            <div className="details">
                <h2>{order.id}</h2>
                <h3>{order.username}</h3>
                {order.orderStatus === OrderStatusEnum.NOT_CONFIRMED && <p style={{color: "grey"}}>{order.orderStatus}</p>}
                {order.orderStatus === OrderStatusEnum.CONFIRMED && <p style={{color: "blue"}}>{order.orderStatus}</p>}
                {order.orderStatus === OrderStatusEnum.COMPLETED && <p style={{color: "green"}}>{order.orderStatus}</p>}
                {order.orderStatus === OrderStatusEnum.CANCELLED && <p style={{color: "red"}}>{order.orderStatus}</p>}
            </div>
            { displayDetails && <ModalComponent close={hideDetails} Body={<OrderDetailsBodyComponent close={hideDetails} order={order} fetchOrders={fetchOrders}></OrderDetailsBodyComponent>}></ModalComponent>  }
        </div>
    )
}

export default OrderComponent;