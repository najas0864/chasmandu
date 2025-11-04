import { useNavigate } from "react-router-dom";
import Foot from "../components/foot.jsx"
import { useCartStore, useOrderStore } from "../other/product";
import "./checkOut.css";
import Slider from "../components/slider.jsx";

const CheckOut = () => {
    const navigate = useNavigate();
    const {createOrder} = useOrderStore();
    const { cart, incrementQuantity, decrementQuantity } = useCartStore();
    const totalPrice = cart.reduce((total, item) => total + (item.price*item.quantity), 0);

    const orderItem = async () => {
        alert("product not valid!");
        // const { success, message } = await createOrder(cart);
        // (!success)?setMassage(message):setMassage(message)
    };
    return(
        <div className="checkoutPage">
            <h2>Checkout page</h2>
            <button className="goBackBth" onClick={()=>navigate(-1)}>⬅</button>
            <center><h2>Place Order.</h2> </center>
            <div className="orderFromCover">
                <div className="orderForm">
                    <input type="text" placeholder="eg: jhon doe" />
                    <input type="email" placeholder="eg: example@gmail.com" />
                    <input type="tel" placeholder="eg: 9800000000" />
                    <input type="text" placeholder="delevery notes" />
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>delevery addresh
                        <input type="text" placeholder="address eg: kathmandu tirpurashor" />
                        <input type="text" placeholder="street name or location info/landmark" />
                    </div>
                    <div style={{display:"flex"}}> paynment methods: 
                        <label htmlFor="cashOnDelevery">cash-on-delevery
                            <input type="radio" name="payment-methods" value={'cashOnDelevery'} id="cashOnDelevery"/>
                        </label>
                        <label htmlFor="QRPaynment">QR-Paynment
                            <input type="radio" name="payment-methods" value={'QRPaynment'} id="QRPaynment"/>
                        </label>
                    </div>
                    {cart.length === 0 ?null:(<button className="OrderConfirmBtn" onClick={orderItem}>place order</button>)}
                </div>
                <div className="orderItems" style={{display:"flex",flexDirection:"column",flex:"1"}}>
                    {cart.length === 0 ? (<p>Your cart is empty</p>) : (cart.map((item,index) => (
                        <li key={index} className="cartItems">
                            <img 
                                src={item.file|| 'icon.svg'}
                                className="cartItemImage"
                                onClick={()=>navigate(`/product/${item.id}`)}
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
                </div>
            </div>
            <Slider products={[{data:"hello"}]}/>   {/*pass trendy products according */}
            <Foot/>
        </div>
    )
}
export default CheckOut;