import {BlockProps, ParentBlock} from "./ParentBlock";
import React, {CSSProperties, FC} from "react";
import blockImage from "./block.png";
import {IBlock} from "./IBlock";

class SubroutineBlock implements IBlock {

    private parentBlock: ParentBlock = new ParentBlock()

    get style(): CSSProperties{
        const style = this.parentBlock.style
        style.backgroundImage = `url(${blockImage})`
        return style
    }

    private _blockCond: FC<BlockProps> = ({title, yellow}) => {
        const background = yellow ? 'yellow' : blockImage
        return <div style={{...this.style, background}}>{title}</div>
    }


    get block(): React.FC<BlockProps> {
        return this._blockCond;
    }
}

export const SubroutineBlockEx = new SubroutineBlock().block
