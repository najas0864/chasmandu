import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../other/product';
import './gridView.css';

export const DisplayGrid = () => {
    const navigate = useNavigate()
    const {products, fetchProducts} = useProduct();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    const Skelaton = () => {
        return(
            <div className='skeleton'>
                <span className="tabContent">
                    <p className='skeleton-text'></p>
                    <p className='skeleton-text'></p>
                </span>
            </div>
        )
    }
    return (
        <div className="productGrid">
            {products.length === 0 ? (Array.from({ length: 9 }).map((_, index) => <Skelaton key={index} />)) :products.map((item, index) => (
                <div
                    key={index}
                    className="box"
                    onClick={()=>navigate(`/single_product/${item._id}`)}
                    style={{backgroundImage: `url(${item.imagesURl?.[0]})`|| 'url(./icon.svg)'}}
                >
                    <span className="tabContent">
                        <p className='itemName'>{item.name}</p>
                        <p className='price'>Rs: {item.price}</p>
                    </span>
                </div>
            ))}
        </div>
    );
};