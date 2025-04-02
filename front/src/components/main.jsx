import "./main.css"
import { DisplayGrid } from "./gridView";

const Main = (props) => {
    return(
        <main>
            <h3>{props.names}</h3>
            <DisplayGrid/>
        </main>
    )
}
export default Main;