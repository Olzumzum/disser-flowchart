import React, {Component} from "react";
import {Button, Container} from "react-bootstrap";

export default class Toolbar extends Component{
    render() {
        return(
            <div className={"p-3 mb-2 bg-secondary"}>
                <Button className={"mr-2"}>Кнопка назад</Button>
                <Button className={"mr-2"}>Кнопка вперед</Button>
                <Button className={"mr-2"}>Сохранить</Button>
                <Button className={"mr-2"}>Запуск</Button>
                <Button className={"mr-2"}>Отладка</Button>
            </div>
        );
    }

}