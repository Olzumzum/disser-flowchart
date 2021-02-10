import React, {Component} from "react";
import {Col} from "react-bootstrap";
import '../../assets/stylesheets/ComponentPanel.css';
import DraggableBlock from "./DraggableBlock";
/**
 * Компонент выполняющий отображение списка всех возможных блоков
 */
class ComponentPanel extends Component{
    render() {
        return(
            <Col sm={3} className={"component_panel"}>
                {/* Здесь должен вставляться список блоков */}
                <DraggableBlock x={0} y={0}/>
                <DraggableBlock x={0} y={60}/>
                <DraggableBlock x={0} y={120}/>
            </Col>
        );
    }
}

export default ComponentPanel;