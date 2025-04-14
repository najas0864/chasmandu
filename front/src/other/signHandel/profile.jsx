import axios from "axios";

const Profile = () => {
    useEffect(()=>{
        getUser();
    },[]);
    const getUser = async () => {
        await axios.get(`/api/validate-cookie`, { withCredentials: true });
    } 
    const handelLogoutSubmmit = async () =>{
        await axios.post(`/api/logout`,{},{
        withCredentials: true,
        })
        navigate("/login");
    }
    return(
        <>
            <p>profile</p>
            <Link><li onClick={handelLogoutSubmmit}>Log out</li></Link>
        </>
    )
}
export default Profile;