import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import axios from 'axios';

import './index.css'
import Home from './views/home';
import Lences from './views/lencs';
import NotFound from './views/404';
import Profile from './views/profile';
import Catagory from './views/catagoryes';
import AdminPage from './views/adminPage';
import SinglePage from './views/singlePage';
import Login from './other/signHandel/login';
import Sign from './other/signHandel/signup';


const PrivateRoute = ({ children }) => {
  const [cooke, setCooke] = useState(undefined);
    useEffect(() => {
      axios.get(`https://35.160.120.126:10000/validate-cookie`, { withCredentials: true })
      .then((res) => (res.data.valid) ? setCooke(true) : setCooke(false))
      .catch(() =>setCooke(false))
    }, []);
    if (cooke === undefined) {return <div>Loading...</div>}
  return cooke? children : <Navigate to="/login" />;
};
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' index element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path='/signup' element={<Sign/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      <Route path='/catagoryes' element={<PrivateRoute><Catagory/></PrivateRoute>}/>
      <Route path='/contact-lence' element={<PrivateRoute><Lences/></PrivateRoute>}/>
      <Route path='/single_product/:id' element={<PrivateRoute><SinglePage/></PrivateRoute>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);