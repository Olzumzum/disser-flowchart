import React, {Component} from "react";
import {Col} from "react-bootstrap";

export default class Component_panel extends Component {
    render() {
        return(
            <Col sm={3} className={"bg-info"}>
                <h3>Row 1 </h3>
                <h3>Row 1 </h3>
                <h3>Row 1 </h3>
            </Col>
        );
    }
}