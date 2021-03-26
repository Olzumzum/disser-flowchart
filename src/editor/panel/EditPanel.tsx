import {CSSProperties, FC, useCallback, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {snapToGrid as doSnapToGrid} from '../dnd/snapToGrid'
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {BlockMap1, RendrerManager} from "../dnd/RendrerManager";
import {blocksTypedSelector} from "../../hooks/blocksTypedSelector";
import {useActions} from "../../hooks/blockActions";
import {changeBlocks} from "../../store/action-creators/blocks";


const styles: CSSProperties = {
    margin: 0,
    float: "right",
    width: "79%",
    height: 400,
    border: '1px solid black',
    backgroundColor: 'aqua'
    // position: 'relative',
}


export interface EditPanelProps {
    snapToGrid: boolean
}

/**
 * изменить координаты left в зависимости от ширины
 * панели компонентов (панель с original Blocks)
 */
function getWidthComponentPanel(): number | null {
    const element = document.getElementById("component_panel")
    if (element != null) {
        return Number(element.offsetWidth)
    } else
        return null
}

//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}

//приводит получаемые объекты к виду, пригодному для отображения
const renderManager = new RendrerManager()
//создает новые блоки
const creator: IBlockFactory = new CreatorBlock()

let fd: Array<BlockMap1> = new Array<BlockMap1>()

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

            let flag = false
            //проверка - блок добавляется с панели перечисления
            // возможных компонентов (Component Panel) или
            //пепетаскивается существующий на панели редактирования блок
           if (blocks.length === 0 ) flag = true
            else blocks.forEach(item => {
                if(item.getId()?.localeCompare(id)){
                    flag = true
                }
           })


            if (flag) {
                //создаем новый id для добавляемого блока
                let idNew: string = generateId()
                addBlocks(creator.createBlock(
                    originBlocks[Number(id)].getTypeBlock(),
                    left - getWidthComponentPanel()!!,
                    top,
                    idNew
                )!!)
            } else {
                //перетаскиваем блок
                changeBlocks(id, left, top)
            }
        },
        [blocks],

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

    if(loading){
        return <h1>Идет загрузка...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }


    return (
        <div>
            <div ref={drop} style={styles}>
                {Object.keys(renderBlocks).map((id) =>
                    renderManager.renders(renderBlocks[Number(id)], id))}
            </div>
        </div>
    )
}