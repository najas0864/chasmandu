import Foot from "../components/foot"
import Main from "../components/main";
import Nav from "../components/nav"

const Lences = () =>{
    const title = 'Contact Lencs';
    return(
        <>
            <Nav/>
            <Main names={title}/>
            <Foot/>
        </>
    )
}
export default Lences;