import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgetPass from "./forgetPass";
import axios from "axios";
import "./signup.css";
// import Gbutton from "./signEasy";


const Sign = () =>{
    const navigate = useNavigate();
    const signPassInp = useRef(null);
    const [otp, setOtp] = useState('');
    const [message, setMessage]=useState('');
    const [isMasked, setIsMasked] = useState(true);
    const [values, setValues] = useState({name: "",email: "",password: "",gender: "",});
    const [showOtpField, setShowOtpField] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 6000);
    }, [message]);
    const handelChange = e =>{
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handelSignSubmmit = async ()=>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!values.name||!values.email||!values.password||values.gender===''){
            return setMessage('Fill all inputs to submmit')
        }
        if (!(emailRegex.test(values.email))) return setMessage("Invalid email format");
        try {
            const responce = await axios.post('http://localhost:8000/signup',values,{
                headers:{"Content-Type":"application/json"},
                withCredentials: true,
            })
            if(responce.data.sucess){
                setShowOtpField(true);
                setMessage(`${responce.data.message}`);
                setValues({name: "",email: "",password: "",gender: ""});
            }
        } catch (error) {setMessage(error.response?.data?.error);}
        
    }
    const handleOtpVerification = async () => {
        try {
            const otpResponse = await axios.post('http://localhost:8000/auth/verify-otp',{otp});
            if (otpResponse.data.success) {
                setShowOtpField(false)
                // setShowPswField(true)
                navigate("/");
            }
        } catch (error) {
            console.error('Error during OTP verification:', error.message);
            setMessage(`${error.message}`);

        }
    };
    const toggleType = () =>{
        if (signPassInp.current) {
            signPassInp.current.style.WebkitTextSecurity = isMasked ? "none" : "square";
            setIsMasked(!isMasked);
        }
    }
    return (
        <main className="sigfMain">
            <h2>Signup</h2>
            <div className="signForm">
                {!showOtpField && (
                    <>
                        <input
                            type="text" 
                            name="name" 
                            value={values.name}
                            autoComplete="username"
                            placeholder="Full Name"
                            onChange={handelChange}
                            required
                        />
                        <input
                            type="email" 
                            name="email" 
                            value={values.email}
                            autoComplete="username"
                            placeholder="Email"
                            onChange={handelChange}
                            required
                        />
                        <div className="passBox">
                            <input
                                ref={signPassInp}
                                className="password"
                                type="text" 
                                value={values.password}
                                name="password" 
                                autoComplete="current-password"
                                placeholder="Create Password"
                                onChange={handelChange}
                                required
                            />
                            <svg className="togType" onClick={toggleType} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {isMasked?(
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
                        <select 
                            name="gender"
                            value={values.gender}
                            onChange={handelChange}
                            required
                        >
                            <option defaultValue={''} >Select Gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"femle"}>Female</option>
                        </select>
                    </>
                )}
                {showOtpField && (
                <>
                    <h4>we sent a OTP in your email plese use OTP to veryfi email for your own security.</h4>
                    <input 
                        type="text"
                        value={otp}
                        placeholder="OTP"
                        onChange={(e) =>setOtp(e.target.value)}
                    />
                    <button className="login-button"
                        onClick={handleOtpVerification}>
                        Verify OTP
                    </button>
                </>
            )}
            {!showOtpField&&(<button type="submit" onClick={handelSignSubmmit}>Signup</button>)}
            {/* <Gbutton/> */}
            </div>
            <center>
                <p>Already have an account?<Link to="/login">Log-in</Link></p><br />
                <ForgetPass/>
            </center>
            {message&&<p>{message}</p>}
        </main>
    );
}
export default Sign;