import { useEffect } from "react";
import Foot from "../components/foot"
import Main from "../components/main";
import Nav from "../components/nav"
import { useProduct } from "../other/product";

const Eyeglass = () =>{
    const title = 'Eyewears';
        const { specs, fetchProductMeta, loading, error } = useProduct();
        useEffect(() => {
            fetchProductMeta();
          }, [fetchProductMeta]);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
    return(
        <>
            <Nav/>
            <div style={{backgroundImage:"url(/placeholder.svg)",backgroundSize:"cover",backgroundPosition: "center",backgroundRepeat: "no-repeat"}}>
                <h2>Get appoinment to check your eye</h2>
                <marquee>Please select a preferred store date and time below for eye checkup appointment booking.</marquee>
                <div style={{display:'flex', flexDirection:'column', gap:'10px',border:'1px solid #ccc', padding:'10px', width:'fit-content', margin:'auto'}}>
                    <span>Book Your Appointment at: 
                        <select name="location" id="location">
                            <option selected disabled>Select place to get appoited.</option>
                            <option value="Boudha">Boudha</option>
                            <option value="Kumaripati">Kumaripati</option>
                            <option value="Butwal">Butwal</option>
                            <option value="Pokhara">Pokhara</option>
                            <option value="Samakhusi">Samakhusi</option>
                            <option value="Bhaktapur">Bhaktapur</option>
                        </select>
                    </span>
                    <span>Select a Date & Time:
                        <input type="date" name="date" id="date" />
                        <input type="time" name="time" id="time" />
                    </span>
                    <input style={{padding:"1rem .5rem",width:"fit-content", borderRadius:"7px",fontSize:"20px", backgroundColor:"#3300ffff", border:"2px solid #fff",}} type="button" value="Create Appoinment"/>
                </div>
            </div>
            <Main products={specs} names={title}/>
            <Foot/>
        </>
    )
}
export default Eyeglass;