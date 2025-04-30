import { useEffect, useRef, useState } from "react";
import { useProduct } from "../other/product";
import Foot from "../components/foot"
import Main from "../components/main"
import Nav from "../components/nav"
import "./allProducts.css";

const AllProducts = () =>{
    const { products, filterResults,filterProducts,fetchProducts,fetchProductMeta,shades,specs,men,women,child,popular,loading} = useProduct();
    
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    useEffect(() => {
        filterProducts();
    }, [filterResults]);
    useEffect(() => {
        fetchProductMeta();
    }, [fetchProductMeta]);    
    const min = 500, max = 6000;
    const trackRef = useRef(null);
    const [minVal, setMinVal] = useState(min);
    const [currentData, setCurrentData] = useState([]);
    const [maxVal, setMaxVal] = useState(max);
    const [isDragging, setIsDragging] = useState(null);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

    const getPercent = (value) => ((value - min) / (max - min)) * 100;

    const handleDragStart = (thumb) => (e) => {
        e.preventDefault();
        setIsDragging(thumb);
    };
    const handleDragMove = (e) => {
        if (!isDragging || !trackRef.current) return;
        const trackRect = trackRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const offsetX = clientX - trackRect.left;
        const percent = Math.max(0, Math.min(100, (offsetX / trackRect.width) * 100));
        const value = Math.round(min + ((max - min) * percent) / 100);
        if (isDragging === "min" && value + 1000 < maxVal) {
            setMinVal(value);
        }
        if (isDragging === "max" && value - 1000 > minVal) {
            setMaxVal(value);
        }
    };
    const handleDragEnd = () => {
        setIsDragging(null);
    };
    useEffect(() => {
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchmove", handleDragMove);
        document.addEventListener("touchend", handleDragEnd);
        return () => {
            document.removeEventListener("mousemove", handleDragMove);
            document.removeEventListener("mouseup", handleDragEnd);
            document.removeEventListener("touchmove", handleDragMove);
            document.removeEventListener("touchend", handleDragEnd);
        };
    });
    const [filters, setFilters] = useState({
        brand: "",
        minPrice: 0,
        maxPrice: 0,
        type: "",
        color: "",
        sort: 'price_asc'
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === "checkbox" ? (checked ? value : "") : value,
        }));
    };
    const applyFilters = async () => {
        filters.minPrice=minVal;
        filters.maxPrice=maxVal;
        filterProducts(filters);
        toggleFilter();
        setCurrentData(filterResults);
    };
    console.log(filterResults);
    
    const clearFilter = () => {
        setFilters({ brand: "", minPrice: 0, maxPrice: 0, type: "", color: "", sort: 'price_asc'})
        filterProducts(filters);
    }
    return(
        <>
            <Nav/>
            <ul className="Filter">
                {loading?(new Array(8).fill(null).map((_, index) => (<li className="navScalaton" key={index}></li>))):(<>
                    <li className="filterBtn" onClick={!isFilterVisible ? toggleFilter : null}>
                        <svg viewBox="0 0 24.00 24.00"  height={"2rem"} width={"2rem"} fill="#000" xmlns="http://www.w3.org/2000/svg" stroke="#FFF">
                            <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round" ></path>
                        </svg>
                    </li>
                    <li onClick={()=>setCurrentData(men)}>men</li>
                    <li onClick={()=>setCurrentData(women)}>women</li>
                    <li onClick={()=>setCurrentData(specs)}>specs</li>
                    <li onClick={()=>setCurrentData(child)}>child</li>
                    <li onClick={()=>setCurrentData(shades)}>shades</li>
                    <li onClick={()=>setCurrentData(popular)}>popular</li>
                </>)}
                <div className={`filterPopup ${isFilterVisible ? "active" : ""}`}>
                    <p className="close" onClick={toggleFilter}>Cancel</p>
                    <h5>Price</h5>
                    <div className="customSlider" ref={trackRef}>
                        <div
                            className="customSliderTrack"
                            style={{
                            left: `${getPercent(minVal)}%`,
                            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
                            }}
                        />
                        <span
                            className="thumb min"
                            data-minval={minVal}
                            onMouseDown={handleDragStart("min")}
                            onTouchStart={handleDragStart("min")}
                            style={{ left: `${getPercent(minVal)}%` }}
                        />
                        <span
                            className="thumb max"
                            data-maxval={maxVal}
                            onMouseDown={handleDragStart("max")}
                            onTouchStart={handleDragStart("max")}
                            style={{ left: `${getPercent(maxVal)}%` }}
                        />
                    </div>
                    <h5>Brands</h5>
                    <select name="brand" id="brand" value={filters.brand} onChange={handleChange}>
                        <option value="">Select one brand</option>
                        <option value="rayban">Rayban</option>
                        <option value="prada">Prada</option>
                        <option value="gucci">Gucci</option>
                        <option value="oakley">Oakley</option>
                    </select>
                    <h5>Color</h5>
                    <select name="color" id="color" value={filters.color} onChange={handleChange}>
                        <option value="">Select color</option>
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                        <option value="crayon">Crayon</option>
                        <option value="brown">Brown</option>
                    </select>
                    <h5>Mode</h5>
                    <div className="productMode">
                        <label htmlFor="shades">
                            <input
                                type="checkbox"
                                id="shades"
                                name="type"
                                value="shades"
                                checked={filters.type === "shades"}
                                onChange={handleChange}
                            />Sunglass
                        </label>
                        <label htmlFor="specs">
                            <input
                                type="checkbox"
                                id="specs"
                                name="type"
                                value="specs"
                                checked={filters.type === "specs"}
                                onChange={handleChange}
                            />Eyewear
                        </label>
                    </div>
                    <select id="method" name="sort" onChange={handleChange} defaultValue="price_asc">
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="newest">Newest</option>
                    </select>
                    <div className="filterActions">
                        <button onClick={applyFilters}>Find</button>
                        <button onClick={clearFilter}>Clear</button>
                    </div>
                </div>
            </ul>
            <Main products={currentData.length===0?products:currentData} names={currentData.length!==0?'Results':'All Products'}/>
            <Foot/>
        </>
    )
}
export default AllProducts;