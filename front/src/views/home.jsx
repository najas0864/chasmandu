import Foot from "../components/foot"
import Header from "../components/header"
import Main from "../components/main"
import Nav from "../components/nav"

const Home = () =>{
    const title = 'Home';
    return(
        <>
            <Nav/>
            <Header/>
            <Main names={title}/>
            <Foot/>
        </>
    )
}
export default Home;