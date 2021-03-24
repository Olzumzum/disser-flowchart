import {CSSProperties, useEffect} from "react";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {BlockMap1, RendrerManager} from "../dnd/RendrerManager";
import {blockReducer} from "../../store/reducers/blockReducer";
import {blocksTypedSelector} from "../../hooks/blocksTypedSelector";
import {useActions} from "../../hooks/blockActions";

const styles: CSSProperties = {
    margin: 0,
    float: "left",
    height: 400,
    width: "20%",
    backgroundColor: 'darkgray',
}

const renderManager = new RendrerManager()

let y: Boolean = false

// export interface BlockMap {
//     [key: string]: { top: number; left: number; title: string, typeBlock: string, id: string }
// }


export const ComponentPanel = () => {
    const {blocks, loading, error} = blocksTypedSelector(state => state.blocks)
    let fd: Array<BlockMap1> = renderManager.convert(blocks)
    const {fetchBlocks} = useActions()

    useEffect(() => {
        fetchBlocks()
    })

    if(loading){
        return <h1>Идет загрузка...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    return (
        <div id={"component_panel"} style={styles}>
            {Object.keys(fd).map((id) => renderManager.renders(fd[Number(id)], "id"))}
        </div>

    )
}
