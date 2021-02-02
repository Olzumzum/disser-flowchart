import React from "react";
import Block from "./blocks/Block";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./typeDndItems";

function BlockProvider({x, y}) {

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.BLOCK},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }}
        >
            <Block x={x} y={y}/>
        </div>
    )
}

export default BlockProvider;