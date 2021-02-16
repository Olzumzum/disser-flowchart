import {CSSProperties, FC} from "react";


const styles: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
}

export interface BlockProps {
    title: string
    yellow?: boolean
}

export class BlockParent{

    private s: CSSProperties = styles

    private _block: FC<BlockProps> = ({title, yellow}) => {
        const background = yellow ? 'yellow' : 'white'
        return <div style={{ ...styles, background }}>{title}</div>
    }


    get block(): React.FC<BlockProps> {
        return this._block;
    }
}

export const Block = new BlockParent().block