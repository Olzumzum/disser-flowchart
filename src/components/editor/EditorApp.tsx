import {CSSProperties, FC, useCallback, useState} from "react";
import {CustomDragLayer} from "./dnd/CustomDragLayer";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Container, Row} from "react-bootstrap";
import {Provider} from "react-redux";
import {store} from "../../store";
import {ErrorMessage} from "./error/ErrorMessage";
import Toolbar from "../Toolbar";
import {EditPanel} from "./panel/EditPanel";
import {CompilerOutputConsole} from "./panel/CompilerOutputConsole";

const styles: CSSProperties = {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,

}


//отключить открытие стандартного браузерного контекстного меню
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

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
                        <EditPanel snapToGrid={snapToGridAfterDrop}/>
                        <CustomDragLayer snapToGrid={snapToGridWhileDragging}/>
                        <ErrorMessage/>
                    </Row>
                    {/*<Row>*/}
                    {/*    <CompilerOutputConsole/>*/}
                    {/*</Row>*/}
                </Container>
            </DndProvider>
        </Provider>
    )

}