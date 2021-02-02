import React, {Component} from "react";
import {Col} from "react-bootstrap";
import Block from "./blocks/Block";

/**
 * Компонент выполняющий отображение списка всех возможных блоков
 */
class ComponentPanel extends Component{
    render() {
        return(
            <Col sm={3} className={"bg-info"} style={{
                height: 300
            }}>
                {/* Здесь должен вставляться список блоков */}
                <Block/>
            </Col>
        );
    }
}

export default ComponentPanel;