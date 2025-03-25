import { useEffect, useRef, useState } from "react";
import axios from "axios"
import "./searchBar.css";
import { Link } from "react-router-dom";
const SearchBar = () =>{
    const searchInp = useRef(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearchVisible, setisCartVisible] = useState(false);
    const toggleSearch = () =>{
        setisCartVisible(!isSearchVisible);
        isSearchVisible?null:searchInp.current.focus();
    }

    const handleSearch = async (inpQuery) => {
        setQuery(inpQuery);
        if (inpQuery.length > 1) {
            const { data } = await axios.get(`/api/search?query=${inpQuery}`);
            setResults(data);
        }
    }
    // const handleKeyDown = async(e) => {  //if key down show all results in one page and navigate to their
    //     if (e.key === "Enter") {
            
    //     }
    // };

    return(
        <>
            <svg onClick={!isSearchVisible? toggleSearch:null} viewBox="0 0 24 24" fill="none" >
                <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" fill="none"></path>
                <path d="M17 17L21 21" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#FFF" strokeWidth="2"></path>
            </svg>
            <ul className={`searchIcon ${isSearchVisible?"active":""}`}>
                <div className="searchBar">
                    <input 
                        ref={searchInp}
                        type="search" 
                        name="search" 
                        id="search" 
                        value={query}
                        placeholder="Search"
                        onChange={e=>handleSearch(e.target.value)}
                        // onKeyDown={handleKeyDown}
                    />
                    <p className="close" onClick={isSearchVisible? toggleSearch:null}>Cancel</p>
                </div>
                <ul className="Suggestion">
                    {results.map((r) => 
                        <Link to={`https://chasmandu-ade3.onrender.com/single_product/${r._id}`}>
                                <li 
                                    onClick={()=>setisCartVisible(false)}
                                    key={r._id}
                                    style={{border:'2px solid #FFF',backgroundImage:`url(/api/uploads/${r.files[0]})`}}
                                >
                                {r.files[0]} {r.name} - ${r.price}
                            </li>
                        </Link>
                    )}
                </ul>
            </ul>
        </>
    )
}
export default SearchBar;