import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Nav from "../components/nav"
import Foot from "../components/foot"
import Slider from "../components/slider"
import Reviews from "../components/review"
import { addToCart } from "../components/cartCRUD"
import "./singlePage.css";



const AddToCart = ({item}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [productName, setProductName] = useState('');
  
  const notify = () => {
    addToCart(item)
    setProductName(item.name);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  return (
    <>
      <div className='cartBtn' onClick={notify}>
        <p>ADD TO CART</p>
        <svg className="cartSvg" fill="#FFF" viewBox="0 0 24 24">
          <path d="M18.5,20.5A1.5,1.5,0,1,1,17,19,1.5,1.5,0,0,1,18.5,20.5ZM11,19a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,11,19Z" fill="#FFF;"></path>
          <path d="M18.2,14a1,1,0,0,0,.93-.63l2.8-7a1,1,0,0,0-.1-.93A1,1,0,0,0,21,5H7.88l-.7-1.74A2,2,0,0,0,5.32,2H3A1,1,0,0,0,3,4H5.32L8.9,13,7.83,15.11A2,2,0,0,0,9.62,18H19a1,1,0,0,0,0-2H9.62l1-2Z" fill="#FFF;"></path>
        </svg>
      </div>
      <div className={`popMessage ${isVisible?"active":""}`}>
        <p><b className='red'>{productName}</b> added to cart.</p>
        <svg className='msgCloseBtn' onClick={() => setIsVisible(false)} viewBox="0 0 24 24">
          <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
    </>
  );
};


const SinglePage = () =>{
    const {id} = useParams();
    const [products, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("description");
    const [activeImage, setActiveImage] = useState(0);


    useEffect(() => {
        fetchItems();
    }, [id]);

    const fetchItems = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/items/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setLoading(false);
        }
    };



    let alert= `!!! OFFER OFFER OFFER !!! Biggest Offer Buy One and get one free on every eyewear. And please don't forget to Sign up.`
    if (loading) {return <p>Loading...</p>}
    return(
        <>
            <Nav/>
            <marquee behavior="scroll" direction="left">{alert}</marquee>
            <main className="mainBox">
                <div className="spContainer">
                    <div className="spImage">
                        <div className="spImageBox">
                            <img
                                className="slider-image"
                                src={`http://localhost:8000/uploads/${products.files?.[activeImage]}`|| 'icon.svg'}
                                alt={products?.name||"Image not found"} 
                            />
                        </div>
                        <div className="tabBox">
                            <div className="tabCover">
                                {products.files?.map((path,index) =>(
                                    <img onClick={()=>setActiveImage(index)} src={`http://localhost:8000/uploads/${path}`} className="tab" key={index}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="spInfo">
                        <h3>{products.name}</h3>
                        <Reviews id={products._id}/>
                        <p className="price"><b>Price :</b> ${products.price}</p>
                        <div className="prductRelateds">
                            <b>Model : {products.model}</b>
                            <b>Color : {products.color}</b>
                            <b>Brand : {products.brand}</b>
                            <b>Catagory : {products.name}</b>
                            <b>Sizes : {products.size}</b>
                        </div>
                        <AddToCart item={products}/>
                    </div>
                </div>
                <br />
                <hr/>
                <br />
                <center><h2>RELATED PRODUCTS</h2></center>
                <Slider/>
                <div className="discReviews">
                    <div className="flipButtons">
                        <a className={`tabButton ${activeTab === "description" ? "active" : ""}`}
                            onClick={() => setActiveTab("description")}
                        >Description</a>

                        <a className={`tabButton ${activeTab === "reviews" ? "active" : ""}`}
                            onClick={() => setActiveTab("reviews")}
                        >Reviews(0)</a>
                    </div>
                    {activeTab === "description" && (
                        <div className="descriptions">
                            <center><h2>Descriptions</h2></center>
                            <p className="descBox">{products.description}</p>
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div className="reviews">
                            <center><h2>Reviews</h2></center>
                            <div className="reviewbox">
                                <span>user.email</span>
                                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                                <span>user.email</span>
                                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                                <span>user.email</span>
                                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                                <span>user.email</span>
                                <p>this product is fire , i just love it and this sit is actually good on this items.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Foot/>
        </>
    )
}
export default SinglePage;