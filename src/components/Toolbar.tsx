import React, {Component} from "react";
import {Button, Container} from "react-bootstrap";
<script src="~/myscript.js"></script>
export default class Toolbar extends Component {
    render() {
        return (
            <Container fluid>
                <div className={"p-3 mb-2 bg-secondary"} >
                    <form action="compilator.php" >
                        <Button className={"mr-2"} size={"sm"}>Кнопка назад</Button>
                        <Button className={"mr-2"} size={"sm"}>Кнопка вперед</Button>
                        <Button className={"mr-2"} size={"sm"}>Сохранить</Button>
                        <Button className={"mr-2"} size={"sm"}>Запуск</Button>
                        <Button className={"mr-2"} size={"sm"}>Отладка</Button>
                        <Button className={"mr-2"} size={"sm"}> <input type="file" name="file" /></Button>
                        <Button className={"mr-2"} size={"sm"}>
                            <select>
                                <option value = "Java">Java</option>
                                <option value = "Python">Python</option>
                                <option value = "C++">C++</option>
                                <option value = "JavaScript">JavaScript</option>
                            </select>
                        </Button>
                        <Button className={"mr-2"} size={"sm"}><input type="submit" name="sub" value="Построить" /></Button>
                    </form>
                </div>
            </Container>

        );
        function test(){
            alert("кайф");
        }
    }

}
