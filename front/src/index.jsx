import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import Home from './views/home';
import NotFound from './views/404';
import AdminPage from './views/admin';
import AllProducts from './views/allProducts';
import Eyeglass from './views/eyeglass';
import Sunglass from './views/sunglass';
import SinglePage from './views/singlePage';
import Sign from './views/formHandel/signup';
import Login from './views/formHandel/login';

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
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' index element={<Home/>}/>
      <Route path='/admin' element={<AdminPage/>}/>    {/*<PrivateRoute></PrivateRoute> */}
      <Route path='/all_products' element={<AllProducts/>}/>
      <Route path='/eyeglass' element={<Eyeglass/>}/>
      <Route path='/sunglass' element={<Sunglass/>}/>
      <Route path='/single_product/:id' element={<SinglePage/>}/>
      <Route path='/signUp' element={<Sign/>}/> 
      <Route path='/signIn' element={<Login/>}/>      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);