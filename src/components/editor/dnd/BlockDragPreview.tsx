import {CSSProperties, FC, useEffect, useState} from "react";
import {getPreviewBlock} from "../blocks/factory/CreatorBlock";

/**
 * Рисует блок при dnd
 */
const styles: CSSProperties = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
}

export interface BlockDragPreviewProps {
    title: string
    typeBlock: string | symbol | null
}

export const BlockDragPreview: FC<BlockDragPreviewProps> = (props) => {
    const [tickTock, setTickTock] = useState(false)
    const {typeBlock} = props

    useEffect(
        function subscribeToIntervalTick() {
            const interval = setInterval(() => setTickTock(!tickTock), 500)
            return () => clearInterval(interval)
        },
        [tickTock]
    )


    return (
        <div style={styles}>
            {getPreviewBlock(typeBlock)?.render()}

        </div>
    )
}



