import {CSSProperties, FC, useCallback, useState} from "react";
import {CustomDragLayer} from "./dnd/CustomDragLayer";
import {EditPanel} from "./panel/EditPanel"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ComponentPanel} from "./panel/ComponentPanel";
import {Col, Container, Row} from "react-bootstrap";
import {Provider} from "react-redux";
import {store} from "../../store";
import {ErrorMessage} from "./error/ErrorMessage";
import Toolbar from "../Toolbar";

const styles: CSSProperties = {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: "red",

}
export const EditorApp: FC = () => {

    const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(false)
    const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(false)

    const handleSnapToGridAfterDropChange = useCallback(() => {
        setSnapToGridAfterDrop(!snapToGridAfterDrop)
    }, [snapToGridAfterDrop])

    const handleSnapToGridWhileDraggingChange = useCallback(() => {
        setSnapToGridWhileDragging(!snapToGridWhileDragging)
    }, [snapToGridWhileDragging])


    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <Container fluid style={styles}>
                    <Row>
                        <Toolbar/>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <ComponentPanel/>
                        </Col>
                        <Col xs={10}>

                            <EditPanel snapToGrid={snapToGridAfterDrop}/>
                            <CustomDragLayer snapToGrid={snapToGridWhileDragging}/>
                        </Col>
                        <ErrorMessage/>
                    </Row>
                </Container>
            </DndProvider>
        </Provider>
    )

}