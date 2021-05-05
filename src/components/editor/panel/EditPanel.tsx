import {CSSProperties, FC, useEffect} from "react";
import {CanvasPainter} from "../canvas/CanvasPainter";
import {convert,rendersDragBlock} from "../dnd/RendrerManager";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {addBlocks} from "../../../store/action-creators/blocks";
import {useDrop} from "react-dnd";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock, generateId} from "../blocks/factory/CreatorBlock";
import {useActions} from "../hooks/blockActions";

import {ItemTypes} from "../dnd/ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {BlockTypes} from "../blocks/primitives/bocks/BlockTypes";
import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {calcCoordinates} from "../calculat_coordinates/blockCoordinates";
import {StartTitleComp} from "./StartTitleComp";


const stylesEditPanel: CSSProperties = {
    float: "right",
    width: "100%",
    height: 600,
    border: '1px solid black',
    backgroundColor: 'aqua',
    marginRight: 6,
}

export function getStyleEditPanel() {
    return stylesEditPanel
}

interface EditPanelProps {
    snapToGrid: boolean
}

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    //создает новые блоки
    const creator: IBlockFactory = new CreatorBlock()
    const {blocks, loading} = blocksTypedSelector(state => state.blocks)

    // действия
    const {fetchBlocks, addBlocks, dragBlock} = useActions()

    useEffect(() => {
        fetchBlocks()
    }, [])

    //добаввить новый блок
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.ADD_TWO_BLOCKS, (data: any) => {
            //координаты добавляемого блока

            const coor = calcCoordinates(null, BlockTypes.BLOCK_PARENT, data[1].idBlock)
            const id = generateId()
            const block = creator.createBlock(
                id,
                BlockTypes.BLOCK_PARENT,
                coor[0],
                coor[1],
            )!!

            addBlocks(
                block, data[1].idBlock
            )
        })
    }, [])


    /**
     * реакция на dnd
     */
    const [, drop] = useDrop({
        accept: ItemTypes.BLOCK,
        drop(item: DragItem, monitor) {
            dragBlock(item, monitor, snapToGrid)
        },
    })

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    return (
        <div id={"edit_panel"}
             ref={drop}
             style={stylesEditPanel}
             onClick={() => startClickPanel(blocks.length)}
        >
             <StartTitleComp/>
             {Object.keys(blocks).map((id) =>
                 rendersDragBlock(convert(blocks)[Number(id)], id))}
            <CanvasPainter/>
        </div>
    )
}

/**
 * Реакция на клик по панели редактирования
 * Запускает процесс создания алгоритма,
 * скрывает надпись-приветствие
 * @param col
 */
function startClickPanel(col: number) {
    if (col === 0) {
        document.getElementById("start_title")!!.style.display = "none"
        BlocksEventEmitter.dispatch(BlockTransformationTypes.ADD_TWO_BLOCKS, [{isInit: true}, {idBlock: "-1"}])
    }
}




