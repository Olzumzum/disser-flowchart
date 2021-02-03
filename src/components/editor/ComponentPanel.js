import React, {Component} from "react";
import {Col} from "react-bootstrap";
import '../../assets/stylesheets/ComponentPanel.css';
/**
 * Компонент выполняющий отображение списка всех возможных блоков
 */
class ComponentPanel extends Component{
    render() {
        return(
            <Col sm={3} className={"component_panel"}>
                {/* Здесь должен вставляться список блоков */}
                {/*<Block/>*/}
            </Col>
        );
    }
}

export default ComponentPanel;