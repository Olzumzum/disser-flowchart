import React, {Component} from "react";
import {EditorApp} from "../components/editor/EditorApp";

/**
 * Стартовая страница сервиса,
 * пока здесь подключается графический редактор блок-схем
 */
export default class Home extends Component {
    render() {
        return (
            //Подключается редактор блок-схем
            <EditorApp/>
        )
    }

}