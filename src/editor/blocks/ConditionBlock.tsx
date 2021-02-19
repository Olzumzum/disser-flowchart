import {Block, BlockParent, BlockProps} from "./Block";
import {CSSProperties, FC, useState} from "react";
import blockImage from "./block.png";



class ConditionBlockParent extends BlockParent{

    get style(): CSSProperties{
        const s = this.styles
        s.backgroundImage = `url(${blockImage})`
        return s
    }

    private _blockCond: FC<BlockProps> = ({title, yellow}) => {
        const background = yellow ? 'yellow' : blockImage
        return <div style={{...this.style, background}}>{title}</div>
    }

    get block(): React.FC<BlockProps> {
        return this._blockCond;
    }
}

export const ConditionBlock = new ConditionBlockParent().block