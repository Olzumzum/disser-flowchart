import React, {Component} from "react";
import Toolbar from "./Toolbar";
import {Container, Row} from "react-bootstrap";
import Component_panel from "./Component_panel";
import Edit_panel from "./Edit_panel";

export default class Editor extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Toolbar/>
                </Row>
                <Row>
                    <Component_panel/>
                    <Edit_panel/>
                </Row>

            </Container>

        );
    }

}