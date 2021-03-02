import {CSSProperties, FC, useCallback, useState} from "react";
import {DraggableBlock} from "../dnd/DraggableBlock";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {DragItem} from "../DragItem";
import {snapToGrid as doSnapToGrid} from '../snapToGrid'
import update from "immutability-helper";

import {IBlock} from "../blocks/primitives/IBlock";
import {CreatorBlockEditPanel} from "../blocks/factory/CreatorBlockEditPanel";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";


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

//интерфейс имеющихся для отображения блоков
export interface BlockMap {
    [key: string]: { top: number; left: number; title: string, typeBlock: string }
}

//отображает перетаскиваемые блоки
export function renderBlock(item: any, key: any) {
    return <DraggableBlock key={key} id={key} {...item} />
}

function getWidthComponentPanel(): number | null {
    const element = document.getElementById("component_panel")

    if (element != null) {
        return Number(element.offsetWidth)
    } else
        return null
}

//генерация уникального id
function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}

let arBlock: Array<IBlock> = new Array<IBlock>()

const creator: IBlockFactory = new CreatorBlockEditPanel()

const originalBlocks = creator.getOriginBlock()

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    const [blocks, setBlocks] = useState<BlockMap>({})

    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            let flag = false
            //проверка - блок добавляется с панели перечисления
            // возможных компонентов (Component Panel) или нет
            Object.keys(originalBlocks).map((key) => {
                    if (!key.localeCompare(id)) {
                        flag = true
                    }
                }
            )
            if (flag) {
                //создаем новый id для добавляемого блока
                let idNew: string = generateId()
                arBlock.push(creator.createBlock(
                    originalBlocks[id].typeBlock.toString,
                    originalBlocks[id].title,
                    left - getWidthComponentPanel()!!,
                    top,
                    idNew
                )!!)

                setBlocks(
                    prevState => ({
                        ...prevState,
                        [idNew]: {
                            top: top,
                            left: left - getWidthComponentPanel()!!,
                            title: originalBlocks[id].title,
                            typeBlock: originalBlocks[id].typeBlock

                        }
                    })
                )
            } else {

                setBlocks(
                    update(blocks, {
                        [id]: {
                            $merge: {left, top},
                        },
                    }),
                )
            }

            arBlock.forEach(value => {
                console.log("id=" + value)
            })

            console.log("list " + arBlock.length)

        },
        [blocks],
    )

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

    return (

        <div>
            <div ref={drop} style={styles}>
                {Object.keys(blocks).map((key) => renderBlock(blocks[key], key))}
            </div>
        </div>
    )
}