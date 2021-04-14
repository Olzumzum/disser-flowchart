import React, {Component} from "react";
import {Button, Container} from "react-bootstrap";
import {load_file} from './compilator/compilator.js'
import {read_file} from './compilator/compilator.js'

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
                    <Button className={"mr-2"} size={"sm"}>
                        <select>
                            <option value = "Java">Java</option>
                            <option value = "Python">Python</option>
                            <option value = "C++">C++</option>
                            <option value = "JavaScript">JavaScript</option>
                        </select>
                    </Button>
                    <Button onClick={load_file} className={"mr-2"} size={"sm"}>Построить
                        <input id="uploaded_file" type="file" name="file_upl" onChange={read_file} hidden />
                    </Button>
                </div>
            </Container>

        );
    }
}
