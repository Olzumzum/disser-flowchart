import {CSSProperties} from "react";
import {renderBlock} from "./EditPanel";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlockEditPanel} from "../blocks/factory/CreatorBlockEditPanel";


const styles: CSSProperties = {
    margin: 0,
    float: "left",
    height: 400,
    width: "20%",
    backgroundColor: 'darkgray',
}

const creator: IBlockFactory = new CreatorBlockEditPanel()
const originalBlocks = creator.getOriginBlock()


export const ComponentPanel = () => {

    return(
        <div >
            <div id={"component_panel"} style={styles}>
                {Object.keys(originalBlocks).map((key) => renderBlock(originalBlocks[key], key))}
            </div>
        </div>
    )
}