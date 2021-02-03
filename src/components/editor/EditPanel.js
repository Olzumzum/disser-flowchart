import BlockDragable from "./BlockDragable";
import React from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./typeDndItems";
import {Col} from "react-bootstrap";
import '../../assets/stylesheets/Block.css';
import '../../assets/stylesheets/Editor.css';
import '../../assets/stylesheets/EditPanel.css';



/**
 * Панель редактирования, составления схемы
 * Здесь осуществляются функции перетаскивания, добавления, удаления
 */


let x = 0;
let y = 0;

function onClick(e) {
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
    console.log("onclick xy " + x + " " + y);


}


function moveBlock(e) {
    x = e.pageX ;
    y = e.pageY ;
    console.log("dnd xy " + x + " " + y);
}

function EditPanel() {


    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.BLOCK,
        drop: () => {
            document.onmouseenter = function (e) {
                moveBlock(e)

                document.onmouseenter = null;
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const blockDraggable = <BlockDragable x={x}
                                          y={y}/>;

    return (

        <Col>
            <div ref={drop}
                 className={"editor"}
            >
                <div
                    className={"edit_panel"}
                    onClick={onClick}

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


