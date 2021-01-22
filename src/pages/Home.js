import React, {Component} from "react";
import Editor from "../components/containers/Editor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export default class Home extends Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <Editor/>
            </DndProvider>

        )
    }

}