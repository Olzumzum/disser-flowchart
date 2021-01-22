import React, {Component} from "react";
import {Col} from "react-bootstrap";
import BlockList from "./BlockProvider";

class ComponentPanel extends Component{
    render() {
        return(
            <Col sm={3} className={"bg-info"}>
                <BlockList/>
            </Col>
        );
    }
}

export default ComponentPanel;