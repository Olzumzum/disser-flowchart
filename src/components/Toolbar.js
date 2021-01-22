import React, {Component} from "react";
import {Button, Container} from "react-bootstrap";

export default class Toolbar extends Component {
    render() {
        return (
            <Container fluid>
                <div className={"p-3 mb-2 bg-secondary"} >
                    <Button className={"mr-2"} size={"sm"}>Кнопка назад</Button>
                    <Button className={"mr-2"} size={"sm"}>Кнопка вперед</Button>
                    <Button className={"mr-2"} size={"sm"}>Сохранить</Button>
                    <Button className={"mr-2"} size={"sm"}>Запуск</Button>
                    <Button className={"mr-2"} size={"sm"}>Отладка</Button>
                </div>
            </Container>
        );
    }

}