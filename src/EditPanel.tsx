import {CSSProperties, FC, useCallback, useState} from "react";
import {DraggableBlock} from "./DraggableBlock";
import {ContainerProps} from "react-bootstrap";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./ItemTypes";
import {DragItem} from "./DragItem";
import {snapToGrid as doSnapToGrid} from './snapToGrid'
import update from 'immutability-helper';

const styles: CSSProperties = {
    width: 300,
    height: 300,
    border: '1px solid black',
    position: 'relative',
}

export interface EditPanelProps {
    snapToGrid: boolean
}

interface BlockMap {
    [key: string]: { top: number; left: number; title: string }
}

function renderBlock(item: any, key: any) {
    return <DraggableBlock key={key} id={key} {...item} />
}

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    const [blocks, setBlocks] = useState<BlockMap>({
        a: {top: 20, left: 80, title: 'Drag me around'},
        b: {top: 180, left: 20, title: 'Drag me too'},
    })

    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            setBlocks(
                update(blocks, {
                    [id]: {
                        $merge: {left, top},
                    },
                }),
            )
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
        <div ref={drop} style={styles}>
            {Object.keys(blocks).map((key) => renderBlock(blocks[key], key))}
        </div>
    )
}