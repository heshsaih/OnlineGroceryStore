import HomePageComponent from "../pages/public/HomePageComponent";
import OrdersPageComponent from "../pages/public/OrdersPageComponent";
import ProductsPageComponent from "../pages/public/ProductsPageComponent";
import { RouteType } from "../types/Routes";
import { Pathnames } from "./pathnames";

export const publicRoutes: RouteType[] = [
    {
        pathname: Pathnames.public.home,
        Component: HomePageComponent
    },
    {
        pathname: Pathnames.public.products,
        Component: ProductsPageComponent
    },
    {
        pathname: Pathnames.public.orders,
        Component: OrdersPageComponent
    }
]