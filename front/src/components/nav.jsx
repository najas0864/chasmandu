import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import Cart from "./cart";
import './nav.css';

const Nav = () => {
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const toggleMenu = () => {setIsMobile(!isMobile)};
  useEffect(() => {
    function handleClickOutside(e) {
      if (isMobile && !btnRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {setIsMobile(false)}
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);
  return (
    <nav className="navbar">
      <div className={`menu-icon ${isMobile ? "active" : ""}`} onClick={toggleMenu} ref={btnRef}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="logo">
        <Link to="/">CHASMANDU</Link>
      </div>
      <ul className={`nav-links ${isMobile ? "active" : ""}`}  ref={menuRef}>
        {location.pathname !== "/" && <Link to="/"><li>Home</li></Link>}
        {location.pathname !== "/all_products" && <Link to="/all_products"><li>All products</li></Link>}
        {location.pathname !== "/sunglass" && <Link to="/sunglass"><li>Sunglasses</li></Link>}
        {location.pathname !== "/eyeglass" && <Link to="/eyeglass"><li>Eyeglasses</li></Link>}
      </ul>
      <div className="itemFinder">
        <SearchBar/>
        <Cart/>
      </div>
    </nav>
  );
};

export default Nav;