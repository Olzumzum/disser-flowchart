import {CSSProperties, FC} from "react";
import blockImage from "./block.png";

/**
 * Родитель всех блоков
 * хранит всю основную информацию
 */

export interface BlockProps {
    title: string
    yellow?: boolean
}

export class ParentBlock {

    protected styles: CSSProperties = {
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        cursor: 'move',
        width: "40px",
        height: "40px",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'contain',
        display: "flex",
        justifyContent: "center",
        margin: "10px"
    }


    private _block: FC<BlockProps> = ({title, yellow}) => {
        const background = yellow ? 'yellow' : 'white'
        return <div style={{...this.styles, background}}>{title}</div>
    }


    get block(): React.FC<BlockProps> {
        return this._block;
    }

    get style(): CSSProperties {
        return this.styles
    }
}
