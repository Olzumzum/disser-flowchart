import {Col} from "react-bootstrap";
import {Component} from "react";
import Block from "./blocks/Block";
import React from 'react';
import BlockProvider from "./BlockProvider";

/**
 * Панель редактирования, составления схемы
 * Здесь осуществляются функции перетаскивания, добавления, удаления
 */

class Edit_panel extends Component {

    onClick = (e) => {

        this.state.x = e.nativeEvent.offsetX;
        this.state.y = e.nativeEvent.offsetY;

    };

    constructor(props) {
        super(props);
        this.state = {x: undefined, y: undefined};

    }

    render() {
        return (
            // <Col >sm={9} className={"bg-warning"}
            <Col className={"bg-warning"}>
                <div style={{
                    width: '100%',
                    height: '100%'
                }}
                     onClick={this.onClick}
                >

                    <BlockProvider x={this.state.x}
                                   y={this.state.y}/>

                </div>

            </Col>
        )
    }

}

export default Edit_panel;

