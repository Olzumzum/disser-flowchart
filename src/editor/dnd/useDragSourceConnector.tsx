import {DragPreviewOptions, DragSourceOptions, useDragDropManager} from "react-dnd";
import {SourceConnector} from "react-dnd/lib/common/SourceConnector";
import {useMemo} from "react";
import {useIsomorphicLayoutEffect} from "react-dnd/lib/hooks/internal/useIsomorphicLayoutEffect";

export function useDragSourceConnector(
    dragSourceOptions: DragSourceOptions | undefined,
    dragPreviewOptions: DragPreviewOptions | undefined,
): SourceConnector {
    const manager = useDragDropManager()
    const connector = useMemo(() => new SourceConnector(manager.getBackend()), [
        manager,
    ])
    useIsomorphicLayoutEffect(() => {
        connector.dragSourceOptions = dragSourceOptions || null
        connector.reconnect()
    }, [connector, dragSourceOptions])
    useIsomorphicLayoutEffect(() => {
        connector.dragPreviewOptions = dragPreviewOptions || null
        connector.reconnect()
    }, [connector, dragPreviewOptions])
    return connector
}