import Filter from "../components/filter";
import Foot from "../components/foot"
import Main from "../components/main"
import Nav from "../components/nav"

const Catagory = () =>{
    const title = 'Catagory';
    return(
        <>
            <Nav/>
            <Filter/>
            <Main names={title}/>
            <Foot/>
        </>
    )
}
export default Catagory;