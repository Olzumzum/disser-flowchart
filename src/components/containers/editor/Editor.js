import React from "react";
import {moveBlock} from "../Game";
import {Container, Row} from "react-bootstrap";
import Edit_panel from "./Edit_panel";
import ComponentPanel from "../ComponentPanel";

function Editor() {

    return (

        <Container fluid>
            {/* <Row>*/}
            {/*     <Toolbar/>*/}
            {/*</Row>*/}
            <Row style={{
                height: 300
            }}>
                <ComponentPanel/>
                <Edit_panel/>
            </Row>

        </Container>

    );
}

export default Editor;



