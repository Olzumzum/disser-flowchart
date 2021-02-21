import {CSSProperties, FC, useEffect} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {getEmptyImage} from "react-dnd-html5-backend";
import {BlockFactory, CreatorBlock} from "./primitives/CreatorBlock";

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
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
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

function selectTypeBlock(typeBlock: string, title: string, left: number, top: number) {
    const blockFactory: BlockFactory = new CreatorBlock()
    return blockFactory.createBlock(typeBlock, title, left, top)
}


export const DraggableBlock: FC<DraggableBlockProps> = (props) => {
    const {id, title, left, top, typeBlock} = props
    const [{isDragging}, drag, preview] = useDrag({
        item: {type: ItemTypes.BLOCK, id, left, top, title, typeBlock},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [])

    return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
            {selectTypeBlock(typeBlock, title, left, top)}
        </div>
    )
}