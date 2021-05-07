import {CSSProperties, FC, useEffect} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemTypes} from "./ItemTypes";
import {useActions} from "../hooks/blockActions";
import {getBlockById} from "../../../store/action-creators/blocks";
import {containerKeeper} from "../panel/EditPanel";


function getStyles(
    left: number,
    top: number,
    isDragging: boolean
): CSSProperties {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        transform,
        WebkitTransform: transform,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
        zIndex: 10,
        position: "absolute",
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
    const {loadBlockById} = useActions()

    useEffect(() => {
        loadBlockById(id)
    }, [])

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.BLOCK, left, top, title, typeBlock, id},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    const block = getBlockById(id)
    const innerLevel= containerKeeper.getInnerLevel(block?.getInnerLevel()!!)
    // console.log("inner " + innerLevel)
    let coor: number[] = innerLevel?.getCoorForBlock(block?.getId()!!)!!
    // console.log("coor " + coor)
    if (coor === undefined){
        coor = [left, top]
    }

    return (
        <div ref={drag} style={getStyles(coor[0], coor[1], isDragging)}>
            {block?.render()}
        </div>
    )
}