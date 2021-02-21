import {BlockProps, ParentBlock} from "./ParentBlock";
import React, {CSSProperties, FC} from "react";
import blockImage from "../../../assets/images/block.png";
import {IBlock} from "./IBlock";

class SubroutineBlock implements IBlock {

    //родитель всех блоков, общие методы
    private parentBlock: ParentBlock = new ParentBlock()
    //экземпляр класса
    private _blockSubroutInstance: FC<BlockProps>|undefined

    //вернуть экземпляр класса
    get block(): React.FC<BlockProps> {
        if(this._blockSubroutInstance === undefined){
            this.parentBlock.blockBackImg(blockImage)
            this._blockSubroutInstance = this.parentBlock.blockInstance
        }
        return this._blockSubroutInstance!!;
    }

}

export const SubroutineBlockEx = new SubroutineBlock().block
