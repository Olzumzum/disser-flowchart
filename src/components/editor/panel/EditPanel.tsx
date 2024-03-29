import {CSSProperties, FC, useEffect} from "react";
import {CanvasPainter, redrewCanvas} from "../canvas/CanvasPainter";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {addBlocks, getBlockById, searchBlockBeUpdate} from "../../../store/action-creators/blocks";
import {useDrop} from "react-dnd";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock, generateId} from "../blocks/factory/CreatorBlock";
import {useActions} from "../hooks/blockActions";

import {ItemTypes} from "../dnd/ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {calcCoorBlockWithTwoBranches, calcCoordinates} from "../calculat_coordinates/blockCoordinates";
import {StartTitleComp} from "./StartTitleComp";
import {ContainerKeeper} from "../container/ContainerKeeper";
import {BlockTypes} from "../blocks/primitives/bocks/BlockTypes";
import {ff} from "../connections/ConnectionPainter";
import {ParameterManager} from "../blocks/parameters/ParameterManager";

const stylesEditPanel: CSSProperties = {
    float: "right",
    width: "100%",
    height: 600,
    marginRight: 6,
}

export function getStyleEditPanel() {
    return stylesEditPanel
}

interface EditPanelProps {
    snapToGrid: boolean
}
//менеджер записи параметров
export const parameterManager = new ParameterManager()
//хранитель всех уровней вложенности
export const containerKeeper = new ContainerKeeper()

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    //создает новые блоки
    const creator: IBlockFactory = new CreatorBlock()
    const {blocks, loading} = blocksTypedSelector(state => state.blocks)

    // действия
    const {fetchBlocks, addBlocks, dragBlock, searchBlockBeUpdate} = useActions()

    useEffect(() => {
        fetchBlocks()
    }, [])

    //добаввить новый блок
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.ADD_TWO_BLOCKS, (data: any) => {
            //координаты добавляемого блока
            const coor = calcCoordinates(null, BlockTypes.BLOCK, data[1].idBlock)
            let innerLevel = 0

            if (data[1].idBlock.localeCompare("-1")) {
                const parent = getBlockById(data[1].idBlock)
                innerLevel = parent?.getInnerLevel()!!
            }

            const id = generateId()
            const block = creator.createBlock(
                id,
                BlockTypes.BLOCK,
                coor[0],
                coor[1],
                data[1].idBlock,
                innerLevel
            )!!


            addBlocks(
                block
            )
            ff("-1", block.getId())
        })
    }, [])

    //добаввить блок условия
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.CONDITIONAL_OPERATOR, (data: any) => {
            //координаты добавляемого блока

            const coor = calcCoordinates(null, BlockTypes.CONDITION, data[1].idBlock)
            const parent = getBlockById(data[1].idBlock)

            const block = creator.createBlock(
                generateId(),
                BlockTypes.CONDITION,
                coor[0],
                coor[1],
                data[1].idBlock,
                parent?.getInnerLevel()!!
            )!!

            addBlocks(
                block
            )

            parent?.setChildId(block.getId())
            searchBlockBeUpdate(parent!!)


            const coorTwoBlocks = calcCoorBlockWithTwoBranches(block.getId())

            const idBlock1 = generateId()
            const idBlock2 = generateId()

            const block1 = creator.createBlock(
                idBlock1,
                BlockTypes.BLOCK,
                coorTwoBlocks[2],
                coorTwoBlocks[3],
                block.getId(),
                block.getInnerLevel() + 1
            )!!
            block1.setNeighbourId(idBlock2)

            addBlocks(
                block1
            )

            const block2 = creator.createBlock(
                idBlock2,
                BlockTypes.BLOCK,
                coorTwoBlocks[0],
                coorTwoBlocks[1],
                idBlock1,
                block.getInnerLevel() + 1
            )!!

            addBlocks(
                block2
            )

        })
    }, [])

    //добаввить цикл
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.LOOP_FOR, (data: any) => {
            //координаты добавляемого блока
            const coor = calcCoordinates(null, BlockTypes.LOOP, data[1].idBlock)
            let innerLevel = 0

            // if (data[1].idBlock.localeCompare("-1")) {
                const parent = getBlockById(data[1].idBlock)
                innerLevel = parent?.getInnerLevel()!!
            // }

            const id = generateId()
            const block = creator.createBlock(
                id,
                BlockTypes.LOOP,
                coor[0],
                coor[1],
                data[1].idBlock,
                innerLevel
            )!!


            addBlocks(
                block
            )
            ff("-1", block.getId())
        })
    }, [])

    //добаввить вводы вывод
    useEffect(() => {
        BlocksEventEmitter.subscribe(BlockTransformationTypes.INOUTPUT, (data: any) => {
            //координаты добавляемого блока
            const coor = calcCoordinates(null, BlockTypes.INOUTPUT, data[1].idBlock)
            let innerLevel = 0

            // if (data[1].idBlock.localeCompare("-1")) {
            const parent = getBlockById(data[1].idBlock)
            innerLevel = parent?.getInnerLevel()!!
            // }

            const id = generateId()
            const block = creator.createBlock(
                id,
                BlockTypes.INOUTPUT,
                coor[0],
                coor[1],
                data[1].idBlock,
                innerLevel
            )!!


            addBlocks(
                block
            )
            ff("-1", block.getId())
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
 * @param col - количество элементов в списке
 */
function startClickPanel(col: number) {
    if (col === 0) {

    document.getElementById("start_title")!!.style.display = "none"
    BlocksEventEmitter.dispatch(BlockTransformationTypes.ADD_TWO_BLOCKS, [{isInit: true}, {idBlock: "-1"}])
    }
}




