import BlockProvider from "./BlockProvider";
import React from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./typeDndItems";
import {moveBlock} from "../MoveToBlock";
import {Col} from "react-bootstrap";


/**
 * Панель редактирования, составления схемы
 * Здесь осуществляются функции перетаскивания, добавления, удаления
 */

let draggableObject = false;

let x = 0;
let y = 0;

function onClick(e) {
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
}

function EditPanel() {


    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.BLOCK,
        drop: () => {
            document.onmouseenter = function (e) {
                moveBlock(e);
                document.onmouseenter = null;
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });



    return (


        <Col className={"bg-warning"}>
            <div ref={drop}
                 style={{
                     width: '100%',
                     height: '100%'
                 }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    onClick={onClick}

                >

                    <BlockProvider x={x}
                                   y={y}/>
                    {isOver && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'red',
                            }}
                        />
                    )}
                </div>
            </div>
        </Col>

    )
}

export default EditPanel;


