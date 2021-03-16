import {CSSProperties} from "react";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {IBlock} from "../blocks/primitives/IBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {RendrerManager} from "../dnd/RendrerManager";

const styles: CSSProperties = {
    margin: 0,
    float: "left",
    height: 400,
    width: "20%",
    backgroundColor: 'darkgray',
}

const creator: IBlockFactory = new CreatorBlock()
const originalBlocks: Array<IBlock> = creator.getOriginBlock()

const renderManager = new RendrerManager()
const h = {top: 0, left: 0,title: "Cond", typeBlock: BlockTypes.CONDITION, id: "123"}


export const ComponentPanel = () => {
    console.log("origin " + originalBlocks.length)
    return(
        <div >
            <div id={"component_panel"} style={styles}>
                {renderManager.render(h)}
            </div>
        </div>
    )
}