import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import Cart from "./cart";
import './nav.css';

const Nav = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const toggleMenu = () => {setIsMobile(!isMobile);}; 
  const [permission, setPermission] = useState(Notification.permission);
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
    <nav className="navbar">
      <div className={`menu-icon ${isMobile ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="logo">
        <Link to="/">CHASMANDU</Link>
      </div>
      <ul className={`nav-links ${isMobile ? "active" : ""}`}>
        {location.pathname !== "/" && <Link to="/"><li>Home</li></Link>}
        {location.pathname !== "/eyeglasses" && <Link to="/eye_glass"><li>Eyeglasses</li></Link>}
        {location.pathname !== "/sunglasses" && <Link to="/sun_glass"><li>Sunglasses</li></Link>}
        {location.pathname !== "/categories" && <Link to="/categories"><li>Categories</li></Link>}
        {(permission !== "granted" && permission !== 'denied')&&(
          <svg className="bell" onClick={grantNotiAccess} fill="#FFFFFF" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M203.80469,112A75.708,75.708,0,0,0,128.57813,36.002c-.19336-.001-.38575-.002-.57911-.002a75.89959,75.89959,0,0,0-75.79589,76c0,35.22754-7.373,55.30566-13.5586,65.94629A11.99864,11.99864,0,0,0,48.9834,196H92v4a36,36,0,0,0,72,0v-4h43.0166a11.99887,11.99887,0,0,0,10.33985-18.05176C211.17383,167.30762,203.80469,147.22852,203.80469,112ZM156,200a28,28,0,0,1-56,0v-4h56Zm54.45313-13.98828A3.89754,3.89754,0,0,1,207.0166,188H48.9834a3.8946,3.8946,0,0,1-3.43652-1.98926,3.96528,3.96528,0,0,1,.01367-4.04394c6.67968-11.49121,14.64258-32.957,14.64258-69.9668A67.89935,67.89935,0,0,1,128.001,44c.17187,0,.34668.001.51855.002A67.70593,67.70593,0,0,1,195.80469,112c0,37.00977,7.958,58.47656,14.63379,69.96777A3.96568,3.96568,0,0,1,210.45313,186.01172Zm12.665-116.32031a3.99578,3.99578,0,0,1-5.35546-1.82032,100.29075,100.29075,0,0,0-36.46485-40.5,4.00008,4.00008,0,1,1,4.26953-6.76562,108.27358,108.27358,0,0,1,39.3711,43.73047A3.99929,3.99929,0,0,1,223.11816,69.69141Zm-188.47168.41308a4.00208,4.00208,0,0,1-3.585-5.76855,108.27358,108.27358,0,0,1,39.3711-43.73047,4.00008,4.00008,0,1,1,4.26953,6.76562,100.29075,100.29075,0,0,0-36.46485,40.5A3.99919,3.99919,0,0,1,34.64648,70.10449Z"></path>
          </svg>
        )}
      </ul>
      <div className="itemFinder">
        <SearchBar/>
        <Cart/>
      </div>
    </nav>
  );
};

export default Nav;