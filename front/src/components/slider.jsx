import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../other/product';
import './slider.css';

const Slider = () => {
  const {products, fetchProducts} = useProduct();
  useEffect(() => {
    fetchProducts();
}, [fetchProducts]);
  const tabWidth = 470;
  const tabWraRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);


  const updateButtonVisibility = () => {
    if (tabWraRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabWraRef.current;
      setShowLeftButton(scrollLeft > 10);
      setShowRightButton(scrollLeft + clientWidth+10 < scrollWidth);
    }
  };
  const scrollLeft = () => {
    if (tabWraRef.current) {
      tabWraRef.current.scrollBy({ left: -tabWidth, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (tabWraRef.current) {
      tabWraRef.current.scrollBy({ left: tabWidth, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const container = tabWraRef.current;
    if (container) {
      updateButtonVisibility();
      container.addEventListener("scroll", updateButtonVisibility);
      return () => container.removeEventListener("scroll", updateButtonVisibility);
    }
  });
  return (
    <div className="sliderContainer">
        <div ref={tabWraRef} className="tabsBox">
          {products.length === 0 ? (<p>😥 No Product avilable.</p>) :products.map((item, index) => (
          <Link key={index} to={`/single_product/${item._id}`}>
            <div 
              style={{backgroundImage: `url(${item.imagesURl?.[0]})`|| 'url(./icon.svg)'}}  //set placeholder flip <
              className="tabs" 
            >
              <div className="tabContent">
                <p>{item.name}</p>
                <p className='price'>$ {item.price}<i style={{float:"right"}}>⭐⭐⭐⭐⭐</i></p>
              </div>
            </div>
          </Link>
          ))}
        </div>
        {showLeftButton && (
          <button onClick={scrollLeft} className="flickityBtn flickity-next-button" type="button" aria-label="Next">
            <svg viewBox="0 0 100 100">
              <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></path>
            </svg>
          </button>
        )}
        {showRightButton && (
          <button onClick={scrollRight} className="flickityBtn flickity-prev-button" type="button" aria-label="Next">
          <svg viewBox="5 0 6 10">
            <path d="M 11 5 L 6 10 L 5 9 L 9 5 L 5 1 L 6 0 L 11 5" fill="#FFF"/>
          </svg>
          </button>
        )}
    </div>
  );
};

export default Slider;