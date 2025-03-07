import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [user, setUser] = useState('');
  
  const images = [
    "/banner-873111_1280.jpg",
    "/banner-1763470_640.jpg",
    "/banner-1763483_640.jpg",
    "/banner-1050613_640.webp",
    "/window-6243815_1280.png",
    "/ai-generated-8371202_640.jpg",
    "/bears-garlic-1370581_640.jpg",
    "/decorative-header-1277841_1280.webp",
  ];
  const totSld = images.length;

  useEffect(()=>{
    const user = localStorage.getItem('user')||'User';
    setUser(JSON.parse(user.toUpperCase()));
  },[])

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
      <p style={{position:'absolute',zIndex: '1',right: "50%",  transform: 'translate(50%, 50%)',textShadow:"0 0 5px black"}}>Wellcome {user}</p>
      {totSld > 0 ? (
        <div 
          className="headImgBox"
          style={{transform: `translateY(-${currentIndex * 25}vh)`,}}
        >
          {images.map((image, index) => (
            <img
              key={index} 
              src={'http://localhost:5173/headerImages'+image}
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