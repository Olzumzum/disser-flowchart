import React from "react";
import {Container, Row} from "react-bootstrap";
import EditPanel from "./EditPanel";
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
                    <EditPanel/>
                </Row>

            </Container>
          </DndProvider>

    );
}

export default Editor;



