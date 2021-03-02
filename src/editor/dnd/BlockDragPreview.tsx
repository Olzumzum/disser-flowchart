import {CSSProperties, FC, memo, useEffect, useState} from "react";

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
    typeBlock: string
}

export const BlockDragPreview: FC<BlockDragPreviewProps> = memo(({title}, {typeBlock}) => {
        const [tickTock, setTickTock] = useState(false)

        useEffect(
            function subscribeToIntervalTick() {
                const interval = setInterval(() => setTickTock(!tickTock), 500)
                return () => clearInterval(interval)
            },
            [tickTock]
        )



        return (
            <div style={styles}>
                {/*<SubroutineBlockEx title={typeBlock} yellow={tickTock} left={0} top={0}/>*/}
            </div>
        )
    }
)