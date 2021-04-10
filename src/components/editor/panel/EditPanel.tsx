import {CSSProperties, FC, useCallback, useEffect} from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../dnd/ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {snapToGrid as doSnapToGrid} from '../dnd/snapToGrid'
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {BlockMap1, RendrerManager} from "../dnd/RendrerManager";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {useActions} from "../hooks/blockActions";
import {changeBlocks, checkCoordinatesBlock} from "../../../store/action-creators/blocks";
import {CanvasPainter} from "../connections/CanvasPainter";
import {getWidthComponentPanel} from "../calculationCoordinats/calculetionCoordinats";


const styles: CSSProperties = {

    float: "right",
    width: "100%",
    height: 400,
    // border: '1px solid black',
    backgroundColor: 'aqua',
    margin: 3,
    marginRight: 6,
    padding: 5,
}


export interface EditPanelProps {
    snapToGrid: boolean
}


//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}

//приводит получаемые объекты к виду, пригодному для отображения
const renderManager = new RendrerManager()
//создает новые блоки
const creator: IBlockFactory = new CreatorBlock()

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    const {originBlocks, blocks, loading, error} = blocksTypedSelector(state => state.blocks)
    let renderBlocks: Array<BlockMap1> = renderManager.convert(blocks)
    const {fetchBlocks, addBlocks, changeBlocks} = useActions()

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
                addBlocks(creator.createBlock(
                    originBlocks[Number(id)].getTypeBlock(),
                    left - getWidthComponentPanel()!!,
                    top,
                    idNew
                )!!)
            } else {
                if (!checkCoordinatesBlock(id, left, top))
                    //перетаскиваем блок
                    changeBlocks(id, left, top)
            }
        },
        [addBlocks, changeBlocks, originBlocks],
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
        <div>
                <div id={"edit_panel"} ref={drop} style={styles}>
                    {Object.keys(renderBlocks).map((id) =>
                        renderManager.renders(renderBlocks[Number(id)], id))}
                        <CanvasPainter/>
                </div>

        </div>
    )
}