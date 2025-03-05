// import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";

const NotFound = ()=>{
    // function NotFound() {
    //     return <Navigate to="/" />;
    // }
    return (
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to={"/"}>
            <button>Goto Home</button>
          </Link>
        </div>
    );
}
export default NotFound;