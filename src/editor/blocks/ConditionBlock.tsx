import {Block, BlockParent, BlockProps} from "./Block";
import {CSSProperties, FC} from "react";
import blockImage from "./block.png";


const styles: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: "40px",
    height: "40px",
    backgroundImage:`url(${blockImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'contain',
    // align: "center",
    display: "flex",
    justifyContent: "center",
    margin: "10px"
}

class ConditionBlockParent{

    private _block: FC<BlockProps> = ({title, yellow}) => {
        const background = yellow ? 'yellow' : blockImage
        return <div style={{ ...styles, background }}>{title}</div>
    }

    get block(): React.FC<BlockProps> {
        return this._block;
    }
}

export const ConditionBlock = new ConditionBlockParent().block