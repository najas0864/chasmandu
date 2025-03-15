import { useEffect, useState } from "react";
import "./header.css";
import axios from "axios";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [items, setItems] = useState('');
  const [user, setUser] = useState('');
  const fetchItems = async () => {
    const response = await axios.get(`https://chasmandu.onrender.com/items`);
    setItems(response.data);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  
  const images = items[0]?.files;
  const totSld = images?.length;  

  useEffect(()=>{
    const user = localStorage.getItem('user')|| JSON.stringify('User');
    setUser(JSON.parse(user));
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
      <p style={{position:'absolute',zIndex: '1',left: "0",textShadow:"0 0 5px black"}}>🖐Wellcome {user}</p>
      {totSld > 0 ? (
        <div 
          className="headImgBox"
          style={{transform: `translateY(-${currentIndex * 25}vh)`,}}
        >
          {images.map((image, index) => (
            <img
              key={index} 
              src={`https://chasmandu.onrender.com/uploads/${image}`}
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