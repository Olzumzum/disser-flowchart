import React, {Component} from "react";
import {Button, Col, Container, Nav, Row, Tab} from "react-bootstrap";

/**
 * Пока здесь ничего полезного,
 * Когда делала эту страницу, думала, что через нее
 * будет производиться импорт-экспорт
 */
export default class File_s extends Component {
    render() {
        return (
            <Container>
                <Tab.Container id={"ledt-tabs-example"} defaultActiveKey={"first"}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant={"pills"} className={"flex-column mt-2"}>
                                <Nav.Item>
                                    <Nav.Link eventKey={"first"}>Save in the system</Nav.Link>
                                    <Nav.Link eventKey={"second"}>Save to Computer</Nav.Link>
                                    <Nav.Link eventKey={"third"}>Export</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content className={"mt-3"}>
                                <Tab.Pane eventKey={"first"}>
                                    <h3>Сохранить файл на компьютер</h3>
                                    <h3>Здесь возможен какой-то текст</h3>
                                    <Button>Save to computer</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"second"}>
                                    <h3>Сохранить файл в системе</h3>
                                    <h3>Здесь возможен какой-то текст</h3>
                                    <Button>Save to computer</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey={"third"}>
                                    <h3>Загрузить файл с компьютера</h3>
                                    <h3>Здесь возможен какой-то текст</h3>
                                    <Button>Export</Button>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        )
    }

}