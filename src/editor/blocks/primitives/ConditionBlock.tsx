import {BlockProps, ParentBlock} from "./ParentBlock";
import {FC} from "react";
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

    getIdBlock(): string {
        return this.parentBlock.id!!;
    }

    setIdBlock(i: string){
        this.parentBlock.id = i
    }



}

export const ConditionBlock = new ConditionBlockParent().block