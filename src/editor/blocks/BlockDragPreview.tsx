import {CSSProperties, FC, memo, useEffect, useState} from "react";
import {SubroutineBlockEx} from "./SubroutineBlockEx";

const styles: CSSProperties = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
}

export interface BlockDragPreviewProps {
    title: string
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
            <SubroutineBlockEx title={title} yellow={tickTock} />
        </div>
    )
})