import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css';
import Home from './views/home';
import Lences from './views/lencs';
import NotFound from './views/404';
import Catagory from './views/catagoryes';
import AdminPage from './views/adminPage';
import SinglePage from './views/singlePage';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [cooke, setCooke] = useState(undefined);
    useEffect(() => {
      axios.get(`/api/validate-cookie`, { withCredentials: true })
      .then((res) => (res.data.valid) ? setCooke(true) : setCooke(false))
      .catch(() =>setCooke(false))
    }, []);
    if (cooke === undefined) {return <div>Loading...</div>}
  return cooke? children : <Navigate to="/login" />;
};
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' index element={<Home/>}/>
      <Route path='/admin' element={<AdminPage/>}/>    {/*<PrivateRoute></PrivateRoute> */}
      <Route path='/categories' element={<Catagory/>}/>
      {/* <Route path='/sign-up' element={<     add sign log etc import footer from nod   />}/> */} 
      <Route path='/log-in' element={<Catagory/>}/>
      <Route path='/contact-lence' element={<Lences/>}/>
      <Route path='/single_product/:id' element={<SinglePage/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);