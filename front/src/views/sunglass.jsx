import { useEffect } from "react";
import Foot from "../components/foot"
import Main from "../components/main";
import Nav from "../components/nav"
import { useProduct } from "../other/product";

const Sunglass = () =>{
    const title = 'Sun glasses';
    const { shades, fetchProductMeta, loading, error } = useProduct();
    useEffect(() => {
        fetchProductMeta();
      }, [fetchProductMeta]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return(
        <>
            <Nav/>
            <Main products={shades} names={title}/>
            <Foot/>
        </>
    )
}
export default Sunglass;