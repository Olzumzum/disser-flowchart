import {CSSProperties, FC, useCallback, useEffect} from "react";
import {CanvasPainter} from "../connections/CanvasPainter";
import {BlockMap, RendrerManager} from "../dnd/RendrerManager";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {checkCoordinatesBlock} from "../../../store/action-creators/blocks";
import {useDrop} from "react-dnd";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock, generateId} from "../blocks/factory/CreatorBlock";
import {useActions} from "../hooks/blockActions";

import {ItemTypes} from "../dnd/ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {snapToGrid as doSnapToGrid} from '../dnd/snapToGrid'
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {START_TITLE} from "../../../assets/strings/editor_strings";


const styles: CSSProperties = {
    float: "right",
    width: "100%",
    height: 400,
    border: '1px solid black',
    backgroundColor: 'aqua',
    marginRight: 6,
}

interface EditPanelProps {
    snapToGrid: boolean
}


export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    //приводит получаемые объекты к виду, пригодному для отображения
    const renderManager = new RendrerManager()
    //создает новые блоки
    const creator: IBlockFactory = new CreatorBlock()

    const {originBlocks, blocks, loading} = blocksTypedSelector(state => state.blocks)
    let renderBlocks: Array<BlockMap> = renderManager.convert(blocks)
    const {fetchBlocks, addBlocks, changingBlockCoor, connectBlocksLink} = useActions()


    useEffect(() => {
        fetchBlocks()
    }, [])


    /**
     * переместить блок или создать блок
     */
    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            //проверка - блок добавляется с панели перечисления
            // возможных компонентов (Component Panel) или
            //пепетаскивается существующий на панели редактирования блок
            if (originBlocks[Number(id)] !== undefined) {
                //создаем новый id для добавляемого блока
                let idNew: string = generateId()
                // addBlocks(creator.createBlock(
                //     originBlocks[Number(id)].getTypeBlock(),
                //     left,
                //     top,
                //     idNew
                // )!!)
            } else {
                // blockMovement(blocks[1], 150)
                if (!checkCoordinatesBlock(id, left, top))
                    //перетаскиваем блок
                    changingBlockCoor(id, left, top)
                else
                    //соединяем блоки
                    connectBlocksLink(id)
            }
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

    const createBlock = () => {
        let idNew: string = generateId()
        addBlocks(creator.createBlock(
            BlockTypes.BLOCK,
            150,
            150,
            idNew
        )!!)


    }

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    //отображение надписи старта при отстутсвии элементов
    if (blocks.length === 0)
        return (
            <div style={styles} onClick={createBlock}>
                <h4>
                    {START_TITLE}
                </h4>
            </div>
        )
    else return (

        <div id={"edit_panel"} ref={drop} style={styles}>
            {Object.keys(renderBlocks).map((id) =>
                renderManager.renders(renderBlocks[Number(id)], id))}
            <CanvasPainter/>
        </div>

    )
}



