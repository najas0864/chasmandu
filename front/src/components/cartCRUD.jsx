import { useEffect, useState } from "react";

let cart = [];
let setCart = () => {};
export const useCart  = () => {
    const [cartState, updateCart] = useState(cart);
    useEffect(() => {
        setCart = updateCart;
        const storedCart = localStorage.getItem("Cart");
        if (storedCart) {
            updateCart(JSON.parse(storedCart));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("Cart", JSON.stringify(cartState));
    }, [cartState]);
    return cartState;
};
export const addToCart = (product) => {
    const goods = {
        id:product._id,
        file:product.files[0],
        name:product.name,
        price:product.price,
    }
    setCart(prevCart => {
        const existingItem = prevCart.findIndex(item => item.id === goods.id);
        if (existingItem !== -1) {
            return prevCart.map((item, index) => index === existingItem ? { ...item, ...goods, quantity: item.quantity+1 } : item);
        } else {
            return [...prevCart, { ...goods, quantity: 1 }];
        }
    });
};
export const incrementQuantity = (id) => {
    setCart(prevCart =>
        prevCart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
    );
};
export const decrementQuantity = (id) => {
    setCart(prevCart =>
        prevCart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
};