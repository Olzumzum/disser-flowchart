import { ParentBlock, BlockProps} from "./ParentBlock";
import {CSSProperties, FC, useState} from "react";
import blockImage from "../../../assets/images/romb.png";
import {IBlock} from "./IBlock";



class ConditionBlockParent implements IBlock{

    //родитель всех блоков, общие методы
    private parentBlock: ParentBlock = new ParentBlock()
    //экземпляр класса
    private _blockCondInstance: FC<BlockProps>|undefined

    //вернуть экземпляр класса
    get block(): React.FC<BlockProps> {
        if(this._blockCondInstance === undefined){
            this.parentBlock.blockBackImg(blockImage)
            this._blockCondInstance = this.parentBlock.blockInstance
        }
        return this._blockCondInstance!!;
    }



}

export const ConditionBlock = new ConditionBlockParent().block