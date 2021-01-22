import React from "react";
import Toolbar from "../../Toolbar";
import {Container, Row} from "react-bootstrap";
import ComponentPanel from "../ComponentPanel";




function Editor(props) {
    // const collectedProps = useDragLayer(spec)

        return (
                <Container fluid>
                    <Row>
                        <Toolbar/>
                    </Row>
                    <Row>
                        <ComponentPanel/>
                        {/*<Edit_panel/>*/}
                    </Row>

                </Container>

        );
}

export default Editor;

