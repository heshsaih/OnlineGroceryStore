import { useEffect, useState } from "react";
import { OrderType } from "../../types/Order";
import { api } from "../../api/api";
import OrderComponent from "../../components/Order";
import { OrderStatusEnum } from "../../enums/OrderStatus.enum";

const OrdersPageComponent = () => {
    const [fetchedOrders, setFetchedOrders] = useState<OrderType[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await api.getAllOrders();
            if (response.data) {
                setFetchedOrders(response.data);
                setFilteredOrders(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterOrders = (filter = "") => {
        setFilteredOrders(fetchedOrders.filter(obj => obj.orderStatus.includes(filter)));
    }

    useEffect(() => {
        fetchOrders()
    }, []);

    return (
        <div id="orders-page">
            <div id="orders-heading">
                <h1>Available orders</h1>
            </div>
            <div id="orders-button">
                <button value={OrderStatusEnum.NOT_CONFIRMED} onClick={e => filterOrders(e.target.value)} className="category">Not confirmed</button>
                <button value={OrderStatusEnum.CONFIRMED} onClick={e => filterOrders(e.target.value)} className="category">Confirmed</button>
                <button value={OrderStatusEnum.CANCELLED} onClick={e => filterOrders(e.target.value)}className="category">Cancelled</button>
                <button value={OrderStatusEnum.COMPLETED} onClick={e => filterOrders(e.target.value)} className="category">Completed</button>
                <button value={""} onClick={e => filterOrders(e.target.value)} className="category">All</button>
            </div>
            <div id="orders">
                { isLoading && <p>Loading...</p> }
                { !isLoading && filteredOrders && filteredOrders.map((x, i) => <OrderComponent key={i} order={x} fetchOrders={fetchOrders}></OrderComponent>) }
            </div>
        </div>
        
    );
}

export default OrdersPageComponent;