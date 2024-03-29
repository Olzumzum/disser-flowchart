import {CSSProperties, FC} from "react";
import {useDragLayer, XYCoord} from "react-dnd";
import {snapToGrid} from "./snapToGrid";
import {BlockDragPreview} from "./BlockDragPreview";
import {ItemTypes} from "./ItemTypes";

const layerStyles: CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
}

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    isSnapToGrid: boolean,
) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }

    let { x, y } = currentOffset

    if (isSnapToGrid) {
        x -= initialOffset.x
        y -= initialOffset.y
        ;[x, y] = snapToGrid(x, y)
        x += initialOffset.x
        y += initialOffset.y
    }

    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
    }
}

export interface CustomDragLayerProps {
    snapToGrid: boolean
}

export const CustomDragLayer: FC<CustomDragLayerProps> = (props) => {
    const {
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }))

    function renderItem() {
        return <BlockDragPreview id={item.id} />
    }

    if (!isDragging) {
        return null
    }
    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
            >
                {renderItem()}
            </div>
        </div>
    )
}