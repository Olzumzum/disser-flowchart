import React from "react";
import Toolbar from "../Toolbar";
import {Container, Row} from "react-bootstrap";
// import Component_panel from "./Component_panel";
// import Edit_panel from "./Edit_panel";
// import {DndProvider, useDragLayer} from "react-dnd";
// import {HTML5Backend} from "react-dnd-html5-backend";


function Editor(props) {
    // const collectedProps = useDragLayer(spec)

        return (
                <Container fluid>
                    <Row>
                        <Toolbar/>
                    </Row>
                    <Row>
                        {/*<Component_panel/>*/}
                        {/*<Edit_panel/>*/}
                    </Row>

                </Container>

        );
}

export default Editor;

