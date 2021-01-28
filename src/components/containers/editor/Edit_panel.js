import {Col} from "react-bootstrap";
import {Component} from "react";
import Block from "../blocks/Block";
import React from 'react';

class Edit_panel extends Component {

    onClick = (e) => {
        this.state.x = e.screenX;
        this.state.y = e.screenY;
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
                    <Block x={this.state.x}
                           y={this.state.y}/>

                </div>

            </Col>
        )
    }

}

export default Edit_panel;

