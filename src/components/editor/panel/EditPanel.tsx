import {CSSProperties, FC, useCallback, useEffect} from "react";
import {CanvasPainter} from "../connections/CanvasPainter";
import {BlockMap, RendrerManager} from "../dnd/RendrerManager";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {addBlocks} from "../../../store/action-creators/blocks";
import {useDrop} from "react-dnd";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock, generateId} from "../blocks/factory/CreatorBlock";
import {useActions} from "../hooks/blockActions";

import {ItemTypes} from "../dnd/ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {snapToGrid as doSnapToGrid} from '../dnd/snapToGrid'
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {START_TITLE} from "../../../assets/strings/editor_strings";
import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";
import {BlocksEventEmitter} from "../block_conversion/BlocksEmitter";
import {CoordinateCalculator} from "../calculationCoordinats/blockCoordinates";

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
    const coorCalc = new CoordinateCalculator()
    const {blocks, loading} = blocksTypedSelector(state => state.blocks)
    //отрисовывает объекты-блоки
    let renderBlocks: Array<BlockMap> = renderManager.convert(blocks)
    // действия
    const {fetchBlocks, addBlocks, changingBlockCoor} = useActions()

    useEffect(() => {
        fetchBlocks()
    }, [])

    //добаввить новый блок
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.ADD_TWO_BLOCKS, (isInit: boolean) => {
            const coor = coorCalc.calcCoordinates(BlockTypes.BLOCK, isInit)
            addBlocks(
                creator.createBlock(
                    generateId(),
                    BlockTypes.BLOCK,
                    coor[0],
                    coor[1],
                )!!
            )
        })
    }, [])


    /**
     * переместить блок или создать блок
     */
    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            //перетаскиваем блок
            changingBlockCoor(id, left, top)
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

    //отображение надписи старта при отстутсвии элементов
    if (blocks.length === 0)
        return (
            <div style={stylesEditPanel} onClick={() => {
                BlocksEventEmitter.dispatch(BlockTransformationTypes.ADD_TWO_BLOCKS, true)
            }}>
                <h4>
                    {START_TITLE}
                </h4>
            </div>
        )
    else return (
        <div id={"edit_panel"} ref={drop} style={stylesEditPanel}>
            {Object.keys(renderBlocks).map((id) =>
                renderManager.renders(renderBlocks[Number(id)], id))}
            <CanvasPainter/>
        </div>

    )
}




