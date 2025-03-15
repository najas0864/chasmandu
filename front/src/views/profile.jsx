import axios from "axios";

const Profile = () => {
    useEffect(()=>{
        getUser();
    },[])
    const getUser = async () => {
        await axios.get(`https://chasmandu.onrender.com/validate-cookie`, { withCredentials: true });
    } 
    const handelLogoutSubmmit = async () =>{
        await axios.post(`https://chasmandu.onrender.com/logout`,{},{
        withCredentials: true,
        })
        // localStorage.removeItem('user');
        navigate("/login");
    }
    return(
        <>
            <p>profile</p>
            <Link><li onClick={handelLogoutSubmmit}>Log out</li></Link>         {/* move this to profile */}
            
        </>
    )
}
export default Profile;