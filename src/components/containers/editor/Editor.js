import React from "react";
import {moveBlock} from "../Game";
import {Container, Row} from "react-bootstrap";
import Edit_panel from "./Edit_panel";
import ComponentPanel from "../ComponentPanel";
import Block from "../blocks/Block";

function handleBlockClick(toX, toY) {
    moveBlock(toX, toY)
}

function renderEditPanel(i, blockPosition) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return <div onClick={() => handleBlockClick(x, y)}>
        <Block/>
    </div>
}


function Editor({blockPosition}) {

    return (

        <Container fluid>
            {/* <Row>*/}
            {/*     <Toolbar/>*/}
            {/*</Row>*/}
            <Row style={{
                height: 300
            }}>

                <Edit_panel>
                    <ComponentPanel/>
                </Edit_panel>
            </Row>

        </Container>

    );
}

export default Editor;



