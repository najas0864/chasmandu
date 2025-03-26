import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [items, setItems] = useState(5);

  const totSld = items?.length;  
  useEffect(() => {
    if (totSld>1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => ((prevIndex + 1) % totSld));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [totSld]);
  
  return (
    <header className="header">
      {totSld > 0 ? (
        <div 
          className="headImgBox"
          style={{transform: `translateY(-${currentIndex * 25}vh)`,}}
        >
          {items.map((image, index) => (
            <img
              key={index} 
              src={image}
              style={{transform: `scale(${index === currentIndex ?"1":"1,0"})`,transitionDelay:index === currentIndex ?"0s":"1s",}}
              className="headerImg"
              alt={`Slide ${index}`}
            />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "white" }}>Loading...</p>
      )}
    </header>
  );
}
export default Header;