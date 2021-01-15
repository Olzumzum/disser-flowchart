import React, {Component} from "react";
import {Col} from "react-bootstrap";
import Block from "./Block";

export default class Component_panel extends Component {
    render() {
        return(
            <Col sm={3} className={"bg-info"}>
                <Block/>
            </Col>
        );
    }
}