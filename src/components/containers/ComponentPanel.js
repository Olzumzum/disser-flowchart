import React, {Component} from "react";
import {Col} from "react-bootstrap";
import BlockList from "./BlockProvider";
import Block from "./blocks/Block";

class ComponentPanel extends Component{
    render() {
        return(
            <Col sm={3} className={"bg-info"} style={{
                height: 300
            }}>
                <Block/>
            </Col>
        );
    }
}

export default ComponentPanel;