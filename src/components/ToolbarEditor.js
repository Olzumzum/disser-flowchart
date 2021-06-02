import React from "react";
import {Button, Container} from "@material-ui/core";
import {SettingsScreen} from "./settings_panel/SettingsScreen";
import {load_file, read_file} from "./compilator/compilator";


export class ToolbarEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenSettings: false,
        }
        this.handleClickss = this.handleClickss.bind(this)
    }

    handleClickss(e) {
        this.setState({isOpenSettings: true})
    }

    handleClose = () => {
        this.setState({isOpenSettings: false})
    }

    render() {
        // const {isOpen} = this.state
        return (
            <Container fluid>
                <div className={"p-3 mb-2 bg-secondary"}>
                    <Button className={"mr-2"} size={"sm"}>Кнопка назад</Button>
                    <Button className={"mr-2"} size={"sm"}
                            onClick={this.handleClickss}
                    >Настройки</Button>

                    <Button className={"mr-2"} size={"sm"}>Сохранить</Button>
                    <Button className={"mr-2"} size={"sm"}>Запуск</Button>
                    <Button className={"mr-2"} size={"sm"}>Отладка</Button>
                    <Button className={"mr-2"} size={"sm"}>
                        <select>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="C++">C++</option>
                            <option value="JavaScript">JavaScript</option>
                        </select>
                    </Button>
                    <Button onClick={load_file} className={"mr-2"} size={"sm"}>Построить
                        <input id="uploaded_file" type="file" name="file_upl" onChange={read_file} hidden/>
                    </Button>
                </div>
                <SettingsScreen isOpenSettings={this.state.isOpenSettings} handleClose={this.handleClose}/>

            </Container>

        );

    }
}
