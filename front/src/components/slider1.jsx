import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../other/product';
import './slider1.css';

export const DisplayGrid = () => {
    const navigate = useNavigate()
    const {products, fetchProducts} = useProduct();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    return (
        <div className='gridtemplet'>
            <div className='rangeBox'>
                container for costumizing range
            </div>
            <div className="productGrid">
                {products.length === 0 ? (<p>😥 No Product avilable.</p>) :products.map((item, index) => (
                    <div
                        key={index}
                        onClick={()=>navigate(`/single_product/${item._id}`)}
                        style={{backgroundImage: `url(${item.imagesURl?.[0]})`|| 'url(./icon.svg)'}}
                        className="boxOfProduct"
                    >
                        <span className="tabContent">
                            <p className='itemName'>{item.name}</p>
                            <p className='price'>$ {item.price}</p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};