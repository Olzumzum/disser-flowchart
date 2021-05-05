import {CSSProperties, FC, useEffect, useState} from "react";
import {useActions} from "../hooks/blockActions";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";

/**
 * Рисует блок при dnd
 */
const styles: CSSProperties = {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)',
}

export interface BlockDragPreviewProps {
    id: string
}

export const BlockDragPreview: FC<BlockDragPreviewProps> = ({id}) => {
    const [tickTock, setTickTock] = useState(false)
    const {block} = blocksTypedSelector(state => state.blocks)
    const {loadBlockById} = useActions()

    useEffect(() => {
        loadBlockById(id)
    }, [])

    useEffect(
        function subscribeToIntervalTick() {
            const interval = setInterval(() => setTickTock(!tickTock), 500)
            return () => clearInterval(interval)
        },
        [tickTock]
    )


    return (
        <div style={styles}>
            {/*{block?.render()}*/}

        </div>
    )
}



