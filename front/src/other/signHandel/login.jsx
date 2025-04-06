import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ForgetPass from "./forgetPass";
// import Gbutton from "./signEasy";

const Login = () => {
    const navigate = useNavigate();
    const logPassInp = useRef(null);
    const [message, setMessage]=useState('');
    const [isBlink, setIsBlink] = useState(true);
    const [data, setData] = useState({email: "",password: ""});
    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 4000);
    }, [message]);
    const handelLogSubmmit = async ()=>{
        if(!data.email||!data.password) return setMessage('fill both fields to login.');
        try {
            const info = {email:data.email,password:data.password}
            const res = await axios.post(`/api/login`, info,{
                headers:{"Content-Type":"application/json"},
                withCredentials: true,
            });
            if(res){
                setMessage(`${res?.data?.message}`)
                navigate("/");
            }
        } catch (error) {
            if(error){
                setMessage(`${error?.response?.data?.error||"error"}`)
            }
        }
    }

    const toggleType = () =>{
        if (logPassInp.current) {
            logPassInp.current.style.WebkitTextSecurity = isBlink ? "none" : "square";
            setIsBlink(!isBlink);
        }
    }
    return (
        <main className="lofMain">
            <h2>Login</h2>
            <div className="logForm">
                <input
                    type="email" 
                    name="email" 
                    value={data.email}
                    placeholder="Email"
                    autoComplete="username"
                    onChange={e=>setData({ ...data, [e.target.name]: e.target.value })}
                    required
                />
                <div className="passBox">
                    <input
                        ref={logPassInp}
                        className="password"
                        type="text" 
                        name="password" 
                        autoComplete="current-password"
                        value={data.password}
                        placeholder="Password"
                        onChange={e=>setData({ ...data, [e.target.name]: e.target.value })}
                        required
                    />
                    <svg className="togType" onClick={toggleType} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {isBlink?(
                        <path d="M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5" 
                            stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
                        </path> 
                    ):(
                        <>
                            <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 
                                8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 
                                7.4404 15.7574 5 12 5Z" 
                                stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            </path> 
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                                stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            </path> 
                        </>
                    )}
                    </svg>
                </div>
                <button type="submit" onClick={handelLogSubmmit}>Login</button>
                {/* <Gbutton/> */}
            </div>
            <center>
                <p>Don't have an account?<Link to="/signup">Sign-up</Link></p>
                <br />
                <ForgetPass/>
            </center>
            {message&&<p>{message}</p>}
        </main>
    );
};
export default Login;
