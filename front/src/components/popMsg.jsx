import { useState } from "react";

const PopMessage = ({message}) => {
    const [isVisible, setIsVisible] = useState(false);
    setTimeout(() => {
        setIsVisible(false);
    }, 3000);
    return(
        <div className={`popMessage ${isVisible?"active":""}`}>
            <p>{message}</p>
            <svg className='msgCloseBtn' onClick={() => setIsVisible(false)} viewBox="0 0 24 24">
            <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </div>
    )
}
export default PopMessage;