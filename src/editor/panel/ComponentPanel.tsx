import {CSSProperties} from "react";
import {renderBlock} from "./EditPanel";

import {originalBlocks} from "../blocks/factory/originBlocks";

const styles: CSSProperties = {
    margin: 0,
    float: "left",
    height: 400,
    width: "20%",
    backgroundColor: 'darkgray',
}


export const ComponentPanel = () => {

    return(
        <div >
            <div id={"component_panel"} style={styles}>
                {Object.keys(originalBlocks).map((key) => renderBlock(originalBlocks[key], key))}
            </div>
        </div>
    )
}