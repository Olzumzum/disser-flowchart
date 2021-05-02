import {CSSProperties, FC, useEffect} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemTypes} from "./ItemTypes";
import {getEmptyImage} from "react-dnd-html5-backend";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {IBlock} from "../blocks/primitives/IBlock";
import {getBlockById} from "../../../store/action-creators/blocks";

function getStyles(
    left: number,
    top: number,
    isDragging: boolean
): CSSProperties {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        position: 'absolute',
        transform,
        WebkitTransform: transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    }
}

export interface DraggableBlockProps {
    id: string
    title: string
    left: number
    top: number
    typeBlock: string
}

export const DraggableBlock: FC<DraggableBlockProps> = (props) => {
    const {left, top, title, typeBlock, id} = props

    const [{isDragging}, drag, preview] = useDrag({
        item: {type: ItemTypes.BLOCK, left, top, title, typeBlock, id},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [])

    const block = getBlockById(id)

    return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
            {block?.render()}
        </div>
    )
}