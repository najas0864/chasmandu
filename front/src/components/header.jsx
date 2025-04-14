import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items] = useState([
    "/head0.jpg",
    "/head1.jpg",
    "/head2.jpg",
    "/head3.jpg",
  ]);
  
  useEffect(() => {
    if (items.length>1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => ((prevIndex + 1) % items.length));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [items.length]);
  const grantNotiAccess = () => {
    if (!("Notification" in window)) {
        alert("This browser does not support notification");
    } else if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        setPermission(permission);
      });
    }
  };
  
  return (
    <header className="header">
      {(permission !== "granted" && permission !== 'denied')&&(
        <svg className="bell" onClick={grantNotiAccess} fill="#fff" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17.5V18.5C9 20.1569 10.3431 21 12 21C13.6569 21 15 20.1569 15 18.5V17.5M5.99999 8.5C5.99999 5.18629 8.68628 3.5 12 3.5C15.3137 3.5 18 5.18629 18 8.5C18 10.4392 18.705 12.6133 19.4316 14.3389C20.0348 15.7717 19.0222 17.5 17.4676 17.5H6.53237C4.97778 17.5 3.96518 15.7717 4.56842 14.3389C5.29493 12.6133 5.99999 10.4392 5.99999 8.5Z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {items.length > 0 ? (
        <div className="headImgBox" style={{transform: `translateY(-${currentIndex * 25}vh)`,}}>
          {items.map((image, index) => (
            <img
              key={index} 
              src={image}
              style={{transform: `scale(${index === currentIndex ?"1":"1,0"})`,transitionDelay:index === currentIndex ?"0s":"1s",}}
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