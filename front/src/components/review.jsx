import { useEffect, useState } from "react";
import axios from "axios";
import "./review.css";



const host = import.meta.env.VITE_API_HOST;
const RateApp = ({id}) => {

    const [data, setFetchedData]= useState([]);
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        fetchItems();
    }, []);
    const handleClick = async (value) => {
        setRating(value);
        console.log("User rated:", value);
        const formData = new FormData();
        formData.append("review", value)
        await axios.post(`/api/userReview/${id}`,formData,{
            headers:{ "Content-Type":"application/json"}
        })
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get(`/api/reviews`);
            setFetchedData(response.data);
        } catch (error) {
            error?console.log(error):null;
        }
    };


    return (
        <>
            <i style={{filter:"opacity(0.3)"}}> costomure review</i>
            <div className="revStars">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <svg
                            key={index}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => handleClick(starValue)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={(hover || rating) >= starValue ? "gold" : "gray"}
                            stroke="black"
                            strokeWidth="1"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                        </svg>
                    );
                })}
            </div>
        </>
    );
};
export default RateApp;