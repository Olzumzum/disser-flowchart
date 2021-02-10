import React from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./typeDndItems";
import image_block from "../../assets/images/block.png";
import "../../assets/stylesheets/Block.css";

function DraggableBlock({x, y}) {

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.BLOCK},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    let block = <div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move'
        }}
    >
        <img src={image_block} className={"block"}
             style={{
                 position: 'absolute',
                 left: x,
                 top: y,
                 right: 0,
                 bottom: 0
             }}
        />
    </div>


    return (

        block
    )


}


export default DraggableBlock;