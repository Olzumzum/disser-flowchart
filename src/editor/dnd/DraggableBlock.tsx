import {CSSProperties, FC, useEffect} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {getEmptyImage} from "react-dnd-html5-backend";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {ConditionBlockParent} from "../blocks/primitives/ConditionBlock";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";

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

function selectTypeBlock(typeBlock: string, title: string, left: number, top: number, id: string) {
    const blockFactory: IBlockFactory = new CreatorBlock()
    return blockFactory.createBlock(typeBlock,left, top, id)
}


export const DraggableBlock: FC<DraggableBlockProps> = (props) => {
    const {left, top, title, typeBlock, id} = props

    const [{isDragging}, drag, preview] = useDrag({
        item: {type: ItemTypes.BLOCK,left, top, title, typeBlock, id},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [])




    return (
        <div ref={drag} style={getStyles(left, top, isDragging)}>
            { selectTypeBlock(typeBlock, title, left, top, id)}
        </div>
    )
}