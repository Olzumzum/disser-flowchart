import React from "react";
import {Container, Row} from "react-bootstrap";
import Edit_panel from "./Edit_panel";
import ComponentPanel from "./ComponentPanel";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

/**
 * Редактор блок-схем
 * @returns {JSX.Element}
 * @constructor
 */
function Editor() {

    return (
        <DndProvider backend={HTML5Backend}>
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
          </DndProvider>

    );
}

export default Editor;



