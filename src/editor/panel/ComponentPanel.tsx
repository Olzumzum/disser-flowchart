import {CSSProperties, useState} from "react";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {IBlock} from "../blocks/primitives/IBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {BlockMap1, RendrerManager} from "../dnd/RendrerManager";

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

// const convMas = renderManager.convert(originalBlocks)
//
// function r(){
//     convMas.forEach(item => {
//         renderManager.render(convMas[0])
//     })
// }

let y: Boolean = false

export interface BlockMap {
    [key: string]: { top: number; left: number; title: string, typeBlock: string, id: string }
}


export const ComponentPanel = () => {
    let [convMas, setConvMas] = useState<BlockMap>({
        a15: {top: 0, left: 0, title: "Cond", typeBlock: BlockTypes.CONDITION, id: "123"},
        a17: {top: 70, left: 0, title: "Cond", typeBlock: BlockTypes.CONDITION, id: "1234"},
    })
    // console.log("origin " + originalBlocks.length)

    const [mass, setMass] = useState<BlockMap>({})

    let fd: Array<BlockMap1> = renderManager.convert(originalBlocks)


    return (

        <div>
            <div id={"component_panel"} style={styles}>
                {

                    Object.keys(fd).map((id) => renderManager.renders(fd[Number(id)], "id"))
                    // {
                    //     let item: BlockMap1 = fd[Number(id)]
                    //     console.log("ggg " + item.id)
                    // })
                }
            </div>
        </div>
    )
}
