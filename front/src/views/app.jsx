import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './home';
import NotFound from './404';
import AdminPage from './admin';
import Eyeglass from './eyeglass';
import Sunglass from './sunglass';
import CheckOut from './checkOut';
import SinglePage from './singlePage';
import Sign from './formHandel/signup';
import Login from './formHandel/login';
import AllProducts from './allProducts';

window.onerror = function (msg, url, line, col, error) {document.body.innerHTML += `<p>ERROR: ${msg} (${url}:${line}:${col})</p>`;};

const PrivateRoute = ({ children }) => {
  const [cooke, setCooke] = useState(undefined);
    useEffect(() => {
      axios.get(`/api/validate-cookie`, { withCredentials: true })
      .then((res) => (res.data.valid) ? setCooke(true) : setCooke(false))
      .catch(() =>setCooke(false))
    }, []);
    if (cooke === undefined) {return <div>Loading...</div>}
  return cooke? children : <Navigate to="/signIn" />;
};
const App = () => {
  return(
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<AdminPage/>}/>    {/*<PrivateRoute></PrivateRoute> */}
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/eyeglass' element={<Eyeglass/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/sunglass' element={<Sunglass/>}/>
        <Route path='/product/:id' element={<SinglePage/>}/>
        <Route path='/signUp' element={<Sign/>}/> 
        <Route path='/signIn' element={<Login/>}/>      
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;