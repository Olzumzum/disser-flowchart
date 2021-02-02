import {Col} from "react-bootstrap";
import BlockProvider from "./BlockProvider";
import React from "react";


/**
 * Панель редактирования, составления схемы
 * Здесь осуществляются функции перетаскивания, добавления, удаления
 */

let x = 0;
let y = 0;

function onClick(e) {
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
    console.log("hi am " + x + " and " + y);
}

function EditPanel() {

    return (
        <Col className={"bg-warning"}>
            <div style={{
                width: '100%',
                height: '100%'
            }}
                 onClick={onClick}
            >

                <BlockProvider x={x}
                               y={y}/>

            </div>

        </Col>
    )
}

export default EditPanel;


