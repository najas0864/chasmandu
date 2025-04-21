import { useNavigate } from "react-router-dom";
import Foot from "../components/foot.jsx"
import { useCartStore, useOrderStore } from "../other/product";
import "./checkOut.css";

const CheckOut = () => {
    const navigate = useNavigate();
    const {createOrder} = useOrderStore();
    const { cart, incrementQuantity, decrementQuantity } = useCartStore();
    const totalPrice = cart.reduce((total, item) => total + (item.price*item.quantity), 0);

    const orderItem = async () => {
        const { success, message } = await createOrder(cart);
        (!success)?setMassage(message):setMassage(message)
    };
    return(
        <>
            <h2>Checkout page</h2>
            <button onClick={()=>navigate(-1)}>⬅</button>
            <p>form to place order </p>
            <div style={{display:"flex",alignItems:"flex-start"}}>
                <div className="orderForm" style={{display:"flex",flexDirection:"column",alignItems:"flex-start",flex:"1"}}>
                    <input type="text" placeholder="full name eg: jhon doe" />
                    <input type="text" placeholder="email eg: example@gmail.com" />
                    <input type="text" placeholder="mobile no eg: 9800000000" />
                    <input type="text" placeholder="delevery notes" />
                    <label style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>delevery addresh
                        <input type="text" placeholder="address eg: kathmandu tirpurashor" />
                        <input type="text" placeholder="street name or location info/landmark" />
                    </label>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}> paynment methods: 
                        <label htmlFor="cashOnDelevery">cash-on-delevery
                            <input type="radio" name="payment-methods" value={'cashOnDelevery'} id="cashOnDelevery"/>
                        </label>
                        <label htmlFor="QRPaynment">QR-Paynment
                            <input type="radio" name="payment-methods" value={'QRPaynment'} id="QRPaynment"/>
                        </label>
                    </div>
                </div>
                <div className="orderItems" style={{display:"flex",flexDirection:"column",alignItems:"flex-start",flex:"1"}}>
                    {cart.length === 0 ? (<p>Your cart is empty</p>) : (cart.map((item,index) => (
                        <li key={index} className="cartItems">
                            <img 
                                src={item.file|| 'icon.svg'}
                                className="cartItemImage"
                                onClick={()=>navigate(`/single_product/${item.id}`)}
                            />
                            <div>
                                <p title={item.name} className="productName">{item.name}</p>
                                <div>
                                    <span className="price">Rs: {item.price*item.quantity}</span>
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
                            </div>
                        </li>
                    )))}
                    <p>Total:rs{totalPrice}</p>
                    <button onClick={orderItem}>place order</button>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <Foot/>
        </>
    )
}
export default CheckOut;