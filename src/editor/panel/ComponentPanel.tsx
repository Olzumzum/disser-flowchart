import {Col} from "react-bootstrap";
import {DraggableBlock} from "../blocks/DraggableBlock";
import {CSSProperties} from "react";

const styles: CSSProperties = {
    margin: 0,
    float: "left",
    height: 400,
    width: "20%",
    backgroundColor: 'darkgray',
}

export const panelBlock = <DraggableBlock id={"130"} title={"Оригинал"} left={0} top={0}/>

export const ComponentPanel = () => {
    return(
        <div style={styles}>
            {/*{panelBlock}*/}
        </div>
    )
}