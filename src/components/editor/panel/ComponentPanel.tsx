import {CSSProperties, useEffect} from "react";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {BlockMap1, RendrerManager} from "../dnd/RendrerManager";
import {blockReducer} from "../../../store/reducers/blockReducer";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {useActions} from "../hooks/blockActions";
import {fetchBlocks, fetchOriginalBlocks} from "../../../store/action-creators/blocks";
import {ErrorMessage} from "../error/ErrorMessage";

const styles: CSSProperties = {

    float: "left",
    height: 400,
    width: "100%",
    backgroundColor: 'darkgray',
    padding: 15,
    margin: 3,
    marginLeft: 6,

}

const renderManager = new RendrerManager()

export const ComponentPanel = () => {
    const {originBlocks, loading, error} = blocksTypedSelector(state => state.blocks)
    let fd: Array<BlockMap1> = renderManager.convert(originBlocks)
    const {fetchOriginalBlocks} = useActions()

    useEffect(() => {
        fetchOriginalBlocks()
    }, [])

    if(loading){
        return <h1>Идет загрузка...</h1>
    }

    return (
        <div id={"component_panel"} style={styles}>
            {Object.keys(fd).map((id) => renderManager.renders(fd[Number(id)], id))}
        </div>

    )
}
