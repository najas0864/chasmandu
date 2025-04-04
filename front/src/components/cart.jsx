import {  useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../other/product";
import "./cart.css";

const Cart = () => {
    const orderBtn = useRef(null);
    const navigate = useNavigate()
    const [message, setMassage] = useState(null);
    const [isCartVisible, setisCartVisible] = useState(true);
    const toggleCrat = () => setisCartVisible(!isCartVisible);
    const { cart, incrementQuantity, decrementQuantity } = useCartStore();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price*item.quantity), 0);



    const orderItem = async (item) => {
        item.sum=item.price*item.quantity;
        const res = await axios.post(`/api/order`,
            {item},
            { withCredentials: true },
            {headers:{"Content-Type":"application/json"}},
        );   
        console.log(res);
        if(res.data.sucess){
            orderBtn.current.disabled=true;
            setMassage(res.data.message)
        }
    };
    
    return(
        <>
            <div className="redDot" data-qty={`${cartCount}`}></div>
            <svg className="cartIcon"  onClick={isCartVisible? toggleCrat:null} fill="#FFF" viewBox="0 0 24 24">
                <path d="M18.5,20.5A1.5,1.5,0,1,1,17,19,1.5,1.5,0,0,1,18.5,20.5ZM11,19a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,11,19Z" fill="#FFF;"></path>
                <path d="M18.2,14a1,1,0,0,0,.93-.63l2.8-7a1,1,0,0,0-.1-.93A1,1,0,0,0,21,5H7.88l-.7-1.74A2,2,0,0,0,5.32,2H3A1,1,0,0,0,3,4H5.32L8.9,13,7.83,15.11A2,2,0,0,0,9.62,18H19a1,1,0,0,0,0-2H9.62l1-2Z" fill="#FFF;"></path>
            </svg>
            <ul className={`cart-lists ${!isCartVisible ? "active" : ""}`}>
                <div className="cartTitle">
                    <h3>Add item</h3>
                    <p className="close" onClick={!isCartVisible? toggleCrat:null}>Close</p>
                </div>
                <div className="cartItemRapper">
                    {cart.length === 0 ? (<p>Your cart is empty</p>) : (cart.map((item,index) => (
                        <li key={index} className="cartItems">
                            <img 
                                src={item.file|| 'icon.svg'}
                                className="cartItemImage"
                                onClick={()=>navigate(`/single_product/${item.id}`)}
                            />
                            <div>
                                <p title={item.name} className="productName">{item.name}</p>
                                <p className="price">Rs: {item.price*item.quantity}</p>
                            </div>
                            <div>
                                <input 
                                    type="button"
                                    ref={orderBtn}
                                    value={message?`${message}`:"Place Order"}
                                    className="order_item"
                                    onClick={()=>orderItem(item)}
                                />
                                <div className="qtyAlter">
                                    <input
                                        type="button"
                                        value="+"
                                        onClick={()=>incrementQuantity(item.id)}
                                    />
                                    <input 
                                        disabled
                                        type="button"
                                        value={item.quantity}
                                    />
                                    <input 
                                        type="button"
                                        title={item.quantity===1?'Removing Item❔':null}
                                        onClick={()=>decrementQuantity(item.id)}
                                        value={item.quantity===1?'x':'-'}
                                    />
                                </div>
                            </div>
                        </li>
                    )))}
                </div>
                <p style={{textAlign:"right"}}>Total Rs : {totalPrice}</p>
            </ul>
        </>
    )
}
export default Cart;