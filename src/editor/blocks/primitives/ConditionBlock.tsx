import { ParentBlock, BlockProps} from "./ParentBlock";
import {CSSProperties, FC, useState} from "react";
import blockImage from "../../../assets/images/block.png";
import {IBlock} from "./IBlock";



class ConditionBlockParent implements IBlock{

    //родитель всех блоков, общие методы
    private parentBlock: ParentBlock = new ParentBlock()
    //экземпляр класса
    private _blockCondInstance: FC<BlockProps>|undefined

    //вернуть экземпляр класса
    get block(): React.FC<BlockProps> {
        if(this._blockCondInstance === undefined){
            this.parentBlock.blockBackImg("")
            this._blockCondInstance = this.parentBlock.blockInstance
        }
        return this._blockCondInstance!!;
    }

    click(e: React.MouseEvent<HTMLElement>){
        console.log("click click " + e)
    }

}

export const ConditionBlock = new ConditionBlockParent().block