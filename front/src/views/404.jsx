import { Link } from "react-router-dom";
import "./404.css"

const NotFound = ()=>{
  return (
    <div className="pageNotFound">
        <svg className="Error" viewBox="0 0 250 90" xmlns="http://www.w3.org/2000/svg">
          <text  fontSize={"5rem"} x="30" y="55">4</text>
          <text  fontSize={"5rem"} x="70" y="55">0</text>
          <text  fontSize={"5rem"} x="118" y="55">4</text>
          <path
            d="M30,60 L170,60"
            stroke="#FFF"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <text  x="40" y="75">Page Not Found</text>
          <text fontSize={"4.5px"}  x="10" y="85">We couldn't find the page you were looking for. It might have been moved or deleted.</text>
          <Link to={'/'} className="gotoHome">
            <rect fill="none" x="170" y="30" rx="10" ry="10" width="70" height="20" stroke="#FFF" strokeWidth="2"/>
            <text fontSize={"7px"} x="183" y="42">Back to Home</text>
          </Link>
        </svg>

    </div>
  )
}
export default NotFound;