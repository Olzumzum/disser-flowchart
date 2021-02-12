import {Col} from "react-bootstrap";
import {DraggableBlock} from "../blocks/DraggableBlock";

export const ComponentPanel = () => {
    return(
        <Col sm={3} className={"component_panel"}>
            <DraggableBlock id={"0"} title={"Оригинал"} left={0} top={0}/>
        </Col>
    )
}