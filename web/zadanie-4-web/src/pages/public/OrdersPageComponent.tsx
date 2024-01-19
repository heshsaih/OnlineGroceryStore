import { useEffect, useState } from "react";
import { OrderType } from "../../types/Order";
import { api } from "../../api/api";
import OrderComponent from "../../components/Order";
import { OrderStatusEnum } from "../../enums/OrderStatus.enum";

const OrdersPageComponent = () => {
    const [fetchedOrders, setFetchedOrders] = useState<OrderType[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [activeButton, setActiveButton] = useState("all");

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
            filterOrders();
        }
    }

    const filterOrders = () => {
        setFilteredOrders(fetchedOrders.filter(obj => obj.orderStatus.includes(filter)));
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [fetchedOrders]);

    useEffect(() => {
        filterOrders();
    }, [filter]);

    return (
        <div id="orders-page">
            <div id="orders-heading">
                <h1>Available orders</h1>
            </div>
            <div id="orders-button">
                <button id="not-confirmed" onClick={(e) => {
                    setActiveButton(e.target.id);
                    setFilter(OrderStatusEnum.NOT_CONFIRMED);
                }} className={activeButton === "not-confirmed" ? "category active" : "category"}>Not confirmed</button>
                <button id="confirmed" onClick={(e) => {
                    setActiveButton(e.target.id);
                    setFilter(OrderStatusEnum.CONFIRMED);
                }} className={activeButton === "confirmed" ? "category active" : "category"}>Confirmed</button>
                <button id="cancelled" onClick={(e) => {
                    setActiveButton(e.target.id);
                    setFilter(OrderStatusEnum.CANCELLED);
                }} className={activeButton === "cancelled" ? "category active" : "category"}>Cancelled</button>
                <button id="completed" onClick={(e) => {
                    setActiveButton(e.target.id);
                    setFilter(OrderStatusEnum.COMPLETED)
                }} className={activeButton === "completed" ? "category active" : "category"}>Completed</button>
                <button id="all" onClick={(e) => {
                    setActiveButton(e.target.id);
                    setFilter("")
                }} className={activeButton === "all" ? "category active" : "category"}>All</button>
            </div>
            <div id="orders">
                { isLoading && <p>Loading...</p> }
                { !isLoading && filteredOrders && filteredOrders.map((x, i) => <OrderComponent key={i} order={x} fetchOrders={fetchOrders}></OrderComponent>) }
                { !isLoading && filteredOrders.length === 0 && <p>There aren't any orders of type {filter}</p> }
            </div>
        </div>
        
    );
}

export default OrdersPageComponent;