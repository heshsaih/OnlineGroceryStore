import { NavLink } from "react-router-dom";
import { BasketIcon, HomeIcon, LogoIcon, OrderIcon, ProductIcon } from "../assets/Icons";
import { NavbarItemType } from "../types/NavbarItem";
import { useEffect, useRef, useState } from "react";
import DropDownComponent from "./DropDownComponent";
import { OrderedProductType } from "../types/Product";

const navbarItems: NavbarItemType[] = [
    {
        path: "/",
        icon: <HomeIcon></HomeIcon>,
        label: "Home"
    },
    {
        path: "/products",
        icon: <ProductIcon></ProductIcon>,
        label: "Products"
    },
    {
        path: "/orders",
        icon: <OrderIcon></OrderIcon>,
        label: "Orders"
    }
];

type NavbarPropsType = {
    orderedProducts: OrderedProductType[], 
    addOrderedProduct: (product: OrderedProductType) => void, 
    removeOrderedProduct: (product: OrderedProductType) => void
}

const Navbar = ({ orderedProducts, addOrderedProduct, removeOrderedProduct }: NavbarPropsType) => {
    const [showBasket, setShowBasket] = useState(false);
    const basketRef = useRef();
    const hideBasket = () => {
        const basket = document.querySelector("#drop-down");
        basket?.classList.replace("show-anim", "hide-anim");
        setTimeout(() => setShowBasket(false), 210);
    };

    const displayBasket = () => {
        setShowBasket(true);
    }

    useEffect(() => {
        const closeBasket = e => {
            if (!basketRef.current.contains(e.target)) {
                hideBasket();
            }
        }
        document.body.addEventListener("click", closeBasket);
        return () => document.body.removeEventListener('click', closeBasket);
    }, []);

    return (
        <div id="navbar">
            <div id="navbar-logo" className="container">
                <LogoIcon></LogoIcon>
                <h1 id="heading">Fresh & tasty</h1>
            </div>
            <div id="navbar-buttons" className="container">
                { navbarItems.map(({ path, icon, label }) => {
                    return <NavLink key={path} to={path} className="navbar-item button">
                        {icon}
                        <p>{label}</p>
                    </NavLink>
                }) }
            </div>
            <div id="basket" ref={basketRef}>
                <button onClick={() => showBasket ? hideBasket() : displayBasket()} className="button"><BasketIcon></BasketIcon></button>
                {showBasket ? <DropDownComponent orderedProducts={orderedProducts} addOrderedProduct={addOrderedProduct} removeOrderedProduct={removeOrderedProduct} ></DropDownComponent> : <></>}
            </div>
        </div>
    )
}

export default Navbar;