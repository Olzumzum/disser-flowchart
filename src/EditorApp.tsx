import {FC, useCallback, useState} from "react";
import {CustomDragLayer} from "./CustomDragLayer";
import {EditPanel} from "./EditPanel"
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

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
            <EditPanel snapToGrid={snapToGridAfterDrop} />
            <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
            <p>
                <label htmlFor="snapToGridWhileDragging">
                    <input
                        id="snapToGridWhileDragging"
                        type="checkbox"
                        checked={snapToGridWhileDragging}
                        onChange={handleSnapToGridWhileDraggingChange}
                    />
                    <small>Snap to grid while dragging</small>
                </label>
                <br />
                <label htmlFor="snapToGridAfterDrop">
                    <input
                        id="snapToGridAfterDrop"
                        type="checkbox"
                        checked={snapToGridAfterDrop}
                        onChange={handleSnapToGridAfterDropChange}
                    />
                    <small>Snap to grid after drop</small>
                </label>
            </p>
        </DndProvider>
    )

}