import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Nav from "../components/nav"
import Foot from "../components/foot"
import Slider from "../components/slider"
import Reviews from "../components/review"
import "./singlePage.css";
import { useCartStore, useProduct } from "../other/product"



const AddToCart = ({item}) => {
  const { addToCarts } = useCartStore();
  const [isVisible, setIsVisible] = useState(false);
  const [productName, setProductName] = useState('');
  
  const notify = () => {
    addToCarts(item)
    setProductName(item.name);
    setIsVisible(true);

    setTimeout(() => {
      setProductName('');
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
  const { singleProduct, fetchSingleProduct } = useProduct();
  const {id} = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  let alert= `!!! OFFER OFFER OFFER !!! Biggest Offer Buy One and get one free on every eyewear. And please don't forget to Sign up.`

  useEffect(() => {
    fetchSingleProduct(id);
  }, [fetchSingleProduct,id]);
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
                                src={`${singleProduct.imagesURl?.[activeImage]}`|| 'icon.svg'}
                                alt={singleProduct?.name||"Image not found"} 
                            />
                        </div>
                        <div className="tabBox">
                            <div className="tabCover">
                                {singleProduct.imagesURl?.map((path,index) =>(
                                    <img onClick={()=>setActiveImage(index)} src={`${path}`} className="tab" key={index}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="spInfo">
                        <h3>{singleProduct.name}</h3>
                        <Reviews id={singleProduct._id}/>
                        <p className="price"><b>Price :</b> ${singleProduct.price}</p>
                        <div className="prductRelateds">
                            <b>Model : {singleProduct.model}</b>
                            <b>Color : {singleProduct.color}</b>
                            <b>Brand : {singleProduct.brand}</b>
                            <b>Catagory : {singleProduct.name}</b>
                            <b>Sizes : {singleProduct.size}</b>
                        </div>
                        <AddToCart item={singleProduct}/>
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
                            <p className="descBox">{singleProduct.description}</p>
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