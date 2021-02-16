import {CSSProperties, FC, useCallback, useState} from "react";
import {DraggableBlock} from "../blocks/DraggableBlock";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {DragItem} from "../DragItem";
import {snapToGrid as doSnapToGrid} from '../snapToGrid'
import {originalBlocks} from "./ComponentPanel";
import update from "immutability-helper";


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

//интерфейс для списка имеющихся для отображения блоков
export interface BlockMap {
    [key: string]: { top: number; left: number; title: string }
}

//отображает перетаскиваемые блоки
export function renderBlock(item: any, key: any) {
    return <DraggableBlock key={key} id={key} {...item} />
}


export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    const [blocks, setBlocks] = useState<BlockMap>({
        // a: {top: 20, left: 80, title: 'Drag me around'},
        // b: {top: 180, left: 20, title: 'Drag me too'},
    })

    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            let flag = false

            Object.keys(originalBlocks).map((key) => {
                    if (!key.localeCompare(id)) {
                        flag = true
                    }
                }
            )

            let idS: string = "ex" + top
            let addingBlock: BlockMap = {[idS]: {top: top, left: left, title: 'New block'}}

            console.log("id " + id)
            if (flag) {
                setBlocks(
                    addingBlock
                    // update(blocks, {
                    //         $add: addingBlock,
                    //     }
                    // )
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

    for (var d in blocks) {
        console.log("value " + d + " ")
    }

    return (

        <div>
            <div ref={drop} style={styles}>
                {Object.keys(blocks).map((key) => renderBlock(blocks[key], key))}
            </div>
        </div>
    )
}