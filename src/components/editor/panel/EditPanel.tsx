import {CSSProperties, FC, useCallback, useEffect} from "react";
import {CanvasPainter, contextCanvas} from "../connections/CanvasPainter";
import {BlockMap, RendrerManager} from "../dnd/RendrerManager";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {addBlocks, getBlockById} from "../../../store/action-creators/blocks";
import {useDrop} from "react-dnd";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock, generateId} from "../blocks/factory/CreatorBlock";
import {useActions} from "../hooks/blockActions";

import {ItemTypes} from "../dnd/ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {snapToGrid as doSnapToGrid} from '../dnd/snapToGrid'
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {calcCoordinates} from "../calculat_coordinates/blockCoordinates";
import {StartTitleComp} from "./StartTitleComp";


const stylesEditPanel: CSSProperties = {
    float: "right",
    width: "100%",
    height: 400,
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
    //приводит получаемые объекты к виду, пригодному для отображения
    const renderManager = new RendrerManager()
    //создает новые блоки
    const creator: IBlockFactory = new CreatorBlock()
    //
    // const canvas = new CanvasPainter()
    const {blocks, loading} = blocksTypedSelector(state => state.blocks)
    //отрисовывает объекты-блоки
    let renderBlocks: Array<BlockMap> = renderManager.convert(blocks)
    // действия
    const {fetchBlocks, addBlocks, changingBlockCoor, linkMaker} = useActions()

    useEffect(() => {
        fetchBlocks()
    }, [])
    const c = <CanvasPainter/>
    //добаввить новый блок
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.ADD_TWO_BLOCKS, (data: any) => {
            //координаты добавляемого блока

            const coor = calcCoordinates(null, BlockTypes.BLOCK, data[1].idBlock)

            const block = creator.createBlock(
                generateId(),
                BlockTypes.BLOCK,
                coor[0],
                coor[1],
            )!!

            addBlocks(
                block, data[1].idBlock
            )

            // block.getCanvasObject(contextCanvas!!)
        })
    }, [])


    /**
     * переместить блок или создать блок
     */
    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            const block = getBlockById(id)

            //перетаскиваем блок
            changingBlockCoor(id, left, top)

            block?.getCanvasObject(contextCanvas!!)

        },
        [],
    )

    /**
     * реакция на dnd
     */
    const [, drop] = useDrop({
        accept: ItemTypes.BLOCK,
        drop(item: DragItem, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number
                y: number
            }

            let left = Math.round(item.left + delta.x)
            let top = Math.round(item.top + delta.y)

            if (snapToGrid) {
                ;[left, top] = doSnapToGrid(left, top)
            }

            moveBlock(item.id, left, top)

            return undefined
        },
    })


    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    return (
        <div id={"edit_panel"} ref={drop} style={stylesEditPanel}
             onClick={() => startClickPanel(blocks.length)}>
            <StartTitleComp/>
            {Object.keys(renderBlocks).map((id) =>
                renderManager.renders(renderBlocks[Number(id)], id))}
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




