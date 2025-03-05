import { useState } from "react";
import "./filter.css";
const Filter = ()=>{

        const [isFilterVisible, setisFilterVisible] = useState(false);
        const toggleFilter = () => setisFilterVisible(!isFilterVisible);
    
    return(
        <div className="Filter">
            <svg viewBox="0 0 24.00 24.00" className="filterBtn" onClick={!isFilterVisible? toggleFilter:null} height={"2rem"} width={"2rem"}  fill="#FFF" xmlns="http://www.w3.org/2000/svg" stroke="#FFF">
                <path d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z" stroke="#FFF" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
            <div className={`filterPopup ${isFilterVisible?"active":""}`}>
                <p className="close" onClick={isFilterVisible? toggleFilter:null}>Cancel</p>
                <form action="">
                    <h5>Brands</h5>
                    <select name="brand" id="brand">
                        <option value={null} >Select one brand</option>
                        <option value="rayban">Rayban</option>
                        <option value="prada">Prada</option>
                        <option value="gucci">Gucci</option>
                        <option value="oakley">Oakley</option>
                    </select>
                    <h5>Price</h5>
                    <label className="priceBox" htmlFor="price">
                        <p>0</p>
                        <input type="range" name="price" id="price" defaultValue={0} />
                        <p>100</p>
                    </label>
                    <h5>Mode</h5>
                    <label htmlFor="sunglasses">Sunglasses
                        <input type="checkbox" name="sunglasses"  id="sunglasses" defaultValue="sunglasses" />
                    </label>
                    <label htmlFor="eyewears">Eyewears
                        <input type="checkbox" name="eyewears" id="eyewears" defaultValue="eyewears" />
                    </label>
                    <h5>Color</h5>
                    <select name="color" id="color">
                        <option value={null} >Select color</option>
                        <option value="red">red</option>
                        <option value="black">black</option>
                        <option value="crayon">crayon</option>
                        <option value="Brown">Brown</option>
                    </select>
                    <input className="findBtn" type="submit" value="Find" />
                    <span>
                        Height:<b>{window.innerHeight}</b> 
                        <br></br>
                        Width:<b>{window.innerWidth} </b>
                        <br></br>
                        notification Permission:<b>{Notification.permission}</b>
                    </span>
                </form>
            </div>
        </div>
    )
}
export default Filter;