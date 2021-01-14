import React, {Component} from "react";
import Toolbar from "./Toolbar";
import {Col, Container} from "react-bootstrap";

export default class Editor extends Component{
    render() {
        return(
            <Toolbar/>,
            <Container fluid>
                <Col sm={4}>
                    <h1>Компоненты</h1>
                    <h1>Компоненты</h1>
                    <h1>Компоненты</h1>
                    <h1>Компоненты</h1>
                </Col>
                <Col sm={8}>
                    <h1>Доска</h1>
                </Col>
            </Container>
        )
    }

}