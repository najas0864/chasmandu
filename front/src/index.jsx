import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css';
import Home from './views/home';
import Lences from './views/lencs';
import NotFound from './views/404';
import Catagory from './views/catagoryes';
import AdminPage from './views/adminPage';
import SinglePage from './views/singlePage';
import { DisplayGrid } from './components/slider1';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' index element={<Home/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/grid' element={<DisplayGrid/>}/>
      <Route path='/categories' element={<Catagory/>}/>
      <Route path='/contact-lence' element={<Lences/>}/>
      <Route path='/single_product/:id' element={<SinglePage/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);