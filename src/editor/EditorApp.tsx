import {FC, useCallback, useState} from "react";
import {CustomDragLayer} from "./panel/CustomDragLayer";
import {EditPanel} from "./panel/EditPanel"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ComponentPanel} from "./panel/ComponentPanel";
import {Container, Row} from "react-bootstrap";

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
        <DndProvider backend={HTML5Backend}>
            <Container fluid>
                {/* <Row>*/}
                {/*     <Toolbar/>*/}
                {/*</Row>*/}
                <Row style={{
                    height: 300
                }}>
                    <ComponentPanel/>
                    <EditPanel snapToGrid={snapToGridAfterDrop}/>
                    <CustomDragLayer snapToGrid={snapToGridWhileDragging}/>
                </Row>
            </Container>
        </DndProvider>
    )

}