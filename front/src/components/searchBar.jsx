import { useEffect, useRef, useState } from "react";
import { useProduct } from "../other/product";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import "./searchBar.css";
const SearchBar = () =>{
    const searchInp = useRef(null);    
    const navigate = useNavigate()
    const [query, setQuery] = useState("");
    const [isSearchVisible, setisCartVisible] = useState(false);
    const toggleSearch = () =>{
        setisCartVisible(!isSearchVisible);
        isSearchVisible?null:searchInp.current.focus();
    }

    const { searchProducts, searchResults } = useProduct();

    const handleSearch = async (inpQuery) => {
        setQuery(inpQuery);
        if (inpQuery.length > 2) {
            searchProducts(inpQuery)
        }
    }
    const debouncedSearch = debounce(handleSearch, 500);
    useEffect(() => {
        debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query]);

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
                        autoComplete="off"
                    />
                    <p className="close" onClick={isSearchVisible? toggleSearch:null}>Cancel</p>
                </div>
                <ul className="Suggestion">
                    {(query.length>2)&&(searchResults.map((result) => 
                        <li 
                            key={result._id}
                            onClick={()=>navigate(`/product/${result._id}`)}
                        >
                            <div style={{backgroundImage:`url(${result?.imagesURl[0]})`}}></div>
                            <u>
                                <p>{result.name}</p>
                                <span>Rs:{result.price}</span>
                            </u>
                        </li>
                    ))}
                </ul>
            </ul>
        </>
    )
}
export default SearchBar;