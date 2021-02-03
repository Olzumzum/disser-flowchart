import React from "react";
import Block from "./blocks/Block";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./typeDndItems";
import uuid from "react-uuid";
import image_block from "../../assets/images/block.png";
import "../../assets/stylesheets/Block.css";

let block = undefined;

function BlockDragable({x, y}) {

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.BLOCK},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    let block = <Block x={x}
                       y={y}
                       idBlock={uuid()}
    />;

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }}
        >
            <img src={image_block}  className={"block"}

                 style={{
                     position: 'absolute',
                     left: x,
                     top: y
                 }}
            />
        </div>
    )
}


export default BlockDragable;