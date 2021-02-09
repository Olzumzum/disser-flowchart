import React from "react";
import Block from "./blocks/Block";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./typeDndItems";
import uuid from "react-uuid";
import image_block from "../../assets/images/block.png";
import "../../assets/stylesheets/Block.css";

let position = [0,0];

function BlockDragable({x, y}) {

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.BLOCK},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })


position = [x,y];


    return (

        <div
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
                     top: y
                 }}
            />
        </div>
    )



}

export function getPosition(){
    return position;
}


//
// export function setPosition(x, y){
//
//     // block.props.x = x;
//     // block.props.y = y;
//     return null;
// }
//
// export function getPosition() {
//     let posetion = undefined;
//
//     // if (block !== undefined)
//         posetion = [block.props.x, block.props.y];
//     // console.log("value " + posetion[0] + " and " + posetion[1]);
//
//     return posetion;
// }


export default BlockDragable;