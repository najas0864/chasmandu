import { useEffect } from "react"
import Foot from "../components/foot"
import Header from "../components/header"
import Main from "../components/main"
import Nav from "../components/nav"
import { useProduct } from "../other/product"

const Home = () =>{
    const title = 'Home';
        const {products, fetchProducts} = useProduct();
        useEffect(() => {
            fetchProducts();
        }, [fetchProducts]);
    return(
        <>
            <Nav/>
            <Header/>
            <Main products={products} names={title}/>
            <Foot/>
        </>
    )
}
export default Home;