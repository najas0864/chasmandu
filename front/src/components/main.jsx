import "./main.css"
import Slider from "./slider";

const Main = (props) => {
    return(
        <main>
            <h3>{props.names}</h3>
            <Slider/>
            <Slider/>
            <Slider/>
            <Slider/>
        </main>
    )
}
export default Main;