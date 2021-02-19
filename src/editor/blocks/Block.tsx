import {CSSProperties, FC} from "react";


// const styles: CSSProperties = {
//     border: '1px dashed gray',
//     padding: '0.5rem 1rem',
//     cursor: 'move',
// }

export interface BlockProps {
    title: string
    yellow?: boolean
}

export class BlockParent {

    protected styles: CSSProperties = {
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        cursor: 'move',
        width: "40px",
        height: "40px",
        // backgroundImage:`url(${blockImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'contain',
        // align: "center",
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
}

export const Block = new BlockParent().block