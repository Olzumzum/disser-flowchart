import DraggableBlock from "./DraggableBlock";
import React, {MouseEvent} from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./typeDndItems";
import {Col} from "react-bootstrap";
import '../../assets/stylesheets/Block.css';
import '../../assets/stylesheets/Editor.css';
import '../../assets/stylesheets/EditPanel.css';
import Block from "./blocks/Block";


/**
 * Панель редактирования, составления схемы
 * Здесь осуществляются функции перетаскивания, добавления, удаления
 */

let x = 0;
let y = 0;

let blockDraggable = undefined;

function onClick(e) {
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
}


function moveBlock(e) {


}

function EditPanel() {


    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.BLOCK,
        drop: (item, monitor) => {
            console.log("Дропнули");


            // console.log("координаты " + onClick((e) => e.pageX));
            // let delta = monitor.getDifferenceFromInitialOffset() {
            //
            // }
            const delta = monitor.getDifferenceFromInitialOffset();
                document.onpointerover = function (e) {

                x = e.clientX - delta.x;
                y = e.clientY - delta.y;
                console.log("Дропнули " + x + " and " + y);
                blockDraggable = <DraggableBlock x={x} y={y}/>
                document.onmousemove = null;
            }

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });


    return (

        //Drop Target
        <Col>
            <div ref={drop}
                 className={"editor"}
            >
                <div
                    className={"edit_panel"}
                    // onClick={onClick}

                >
                    {blockDraggable}

                    {isOver && (
                        <div className="draggable_component"/>
                    )}
                </div>
            </div>
        </Col>
    )
}


export default EditPanel;


