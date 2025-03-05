import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const ForgetPass = () => {
    const navigate = useNavigate();
    const signPassInp = useRef(null);
    const signrePassInp = useRef(null);
    const [otp, setOtp] = useState('');
    const [password, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [rePassword, serRePass] = useState('');
    const [message, setMessage] = useState('');
    const [isMasked, setIsMasked] = useState(true);
    const [otpField, setOtpFeilds] = useState(false);
    const [pswField, setShowPswField] = useState(false);
    const [emailFiels, setEmailFiels] = useState(false);

    
    
    const toggleType = () =>{
        if (signPassInp.current ||signrePassInp.current) {
            signPassInp.current.style.WebkitTextSecurity = isMasked ? "none" : "square";
            signrePassInp.current.style.WebkitTextSecurity = isMasked ? "none" : "square";
            setIsMasked(!isMasked);
        }
    }




    const getOtp = async () => {
        setOtp('');
        if(!email){return setMessage('insert email first.');}
        try {
            const otpResponse = await axios.post('http://localhost:8000/forget-password',{email});
            if (otpResponse.data.sucess) {
                setOtpFeilds(true)
                setMessage(`${otpResponse.data.message}`);
            }
        } catch (error) {
            setMessage(`${error.message}`);
        }
    }
    const handleOtpVerification = async () => {
        try {
            const otpResponse = await axios.post('http://localhost:8000/auth/verify-otp',{otp});
            if (otpResponse.data.success) {
                setShowPswField(true)
                setOtpFeilds(false)
                setEmailFiels(false)
                setMessage(`${otpResponse.data.message}`);
            }
        } catch (error) {
            setMessage(`${error.message}`);

        }
    };
    const handlePswReset =async () => {
        if(!password||!rePassword) return setMessage(`Fill Both Field`);
        if(password!==rePassword) return setMessage(`password doesn't match`);
        try {
            const res = await axios.post("http://localhost:8000/update-password",{password,rePassword,email},{
                headers:{"Content-Type":"application/json"},
            })
            if(res.data.sucess){
                setMessage(`${res.data.message}`);
                navigate('/');
            }

        } catch (error) {
            setMessage(`${error}`);
        }
        

    }

    return(
        <>
            <p>OR</p>
            <Link onClick={()=>setEmailFiels(!emailFiels)}>Forger Password? </Link>
            {emailFiels && (
                <>
                    <br/>
                    <input 
                        type="email"
                        value={email}
                        autoComplete="email"
                        placeholder="Email"
                        onChange={(e) =>setEmail(e.target.value)}
                    />
                    <br/>
                    {otpField&&(
                        <input 
                            type="text"
                            value={otp}
                            placeholder="OTP"
                            onChange={(e) =>setOtp(e.target.value)}
                        />
                    )}
                    <br/>
                    <button onClick={otpField?handleOtpVerification:getOtp}>Send</button>
                    <button onClick={()=>setEmailFiels(!emailFiels)}>close</button>
                    <button onClick={getOtp}>didn't get code</button>
                </>
            )}
            {pswField&&(
                <div title="newPsw">
                    <h4>Create New Secure Password.</h4>
                    <div className="passBox">
                        <input 
                            value={password}
                            type="text"
                            className="password"
                            ref={signPassInp}
                            placeholder="New Password"
                            onChange={(e) =>setPass(e.target.value)}
                        />
                        <br />
                        <input 
                            value={rePassword}
                            type="text"
                            className="password"
                            ref={signrePassInp}
                            placeholder="Re-type Password"
                            onChange={(e) =>serRePass(e.target.value)}
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
                    <button
                        onClick={handlePswReset}>
                        Confirm
                    </button>
                </div>
            )}
            {message&&<p>{message}</p>}
        </>
    )
}
export default ForgetPass;