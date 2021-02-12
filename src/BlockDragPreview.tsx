import {CSSProperties, FC, memo, useEffect, useState} from "react";
import {Block} from "./Block";

const styles: CSSProperties = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
}

export interface BlockDragPreviewProps {
    title: string
}

export interface BoxDragPreviewState {
    tickTock: any
}

export const BlockDragPreview: FC<BlockDragPreviewProps> = memo(({title}) => {
    const [tickTock, setTickTock] = useState(false)

    useEffect(
        function subscribeToIntervalTick(){
            const interval = setInterval(() => setTickTock(!tickTock), 500)
            return () => clearInterval(interval)
        },
        [tickTock]
    )

    return (
        <div style={styles}>
            <Block title={title} yellow={tickTock} />
        </div>
    )
})