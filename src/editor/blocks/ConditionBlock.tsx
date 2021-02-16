import {Block, BlockParent, BlockProps} from "./Block";
import {CSSProperties, FC} from "react";
import blockImage from "../../assets/images/block.png";

const styles: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    backgroundImage: blockImage
}

class ConditionBlockParent{

    private _block: FC<BlockProps> = ({title, yellow}) => {
        const background = yellow ? 'yellow' : 'white'
        return <div style={{ ...styles, background }}>{title}</div>
    }

    get block(): React.FC<BlockProps> {
        return this._block;
    }
}

export const ConditionBlock = new ConditionBlockParent().block