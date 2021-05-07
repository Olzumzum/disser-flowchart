import {CSSProperties, FC, useEffect} from "react";
import {CanvasPainter, contextCanvas, redrewCanvas} from "../canvas/CanvasPainter";
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
import {calcCoorBlockWithTwoBranches, calcCoordinates} from "../calculat_coordinates/blockCoordinates";
import {StartTitleComp, styleContainer} from "./StartTitleComp";
import {ContainerKeeper} from "../container/ContainerKeeper";

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
export const containerKeeper = new ContainerKeeper()

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
            const coor = calcCoordinates(null, BlockTypes.BLOCK, data[1].idBlock)

            const id = generateId()
            const block = creator.createBlock(
                id,
                BlockTypes.BLOCK,
                coor[0],
                coor[1],
            )!!

            addBlocks(
                block, data[1].idBlock
            )
            // containerKeeper.checkLevel(block)
        })
    }, [])

    //добаввить блок условия
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.CONDITIONAL_OPERATOR, (data: any) => {
            //координаты добавляемого блока

            const coor = calcCoordinates(null, BlockTypes.CONDITION, data[1].idBlock)

            const id = generateId()
            const block = creator.createBlock(
                id,
                BlockTypes.CONDITION,
                coor[0],
                coor[1],
            )!!

            addBlocks(
                block, data[1].idBlock
            )

            const coorTwoBlocks = calcCoorBlockWithTwoBranches(id)
            const block1 = creator.createBlock(
                "1",
                BlockTypes.BLOCK,
                coorTwoBlocks[0],
                coorTwoBlocks[1],
            )!!
            block1.setInnerLevel(block.getInnerLevel() + 1)
            addBlocks(
                block1, id
            )
            const block2 = creator.createBlock(
                "2",
                BlockTypes.BLOCK,
                coorTwoBlocks[2],
                coorTwoBlocks[3],
            )!!
            block2.setInnerLevel(block.getInnerLevel() + 1)
            addBlocks(
                block2, id
            )

            // containerKeeper.checkLevel(block)
            // containerKeeper.checkLevel(block1)
            // containerKeeper.checkLevel(block2)

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
            {Object.keys(containerKeeper.members).map(() =>
                containerKeeper.render())
            }
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
    // if (col === 0) {
        containerKeeper.init()
        redrewCanvas()
        document.getElementById("start_title")!!.style.display = "none"
        BlocksEventEmitter.dispatch(BlockTransformationTypes.ADD_TWO_BLOCKS, [{isInit: true}, {idBlock: "-1"}])
    // }
}




