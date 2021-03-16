import {BlockProps, ParentBlock} from "./ParentBlock";
import React, {FC} from "react";
import blockImage from "../../../assets/images/rectangle.png";
import {IBlock} from "./IBlock";

export class SubroutineBlock implements IBlock {

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

    getIdBlock(): string {
        return "r";
    }


    getId(): number | undefined {
        return undefined;
    }

    getTypeBlock(): string {
        return "";
    }

    setId(id: number): void {
    }

    setTypeBlock(type: string): void {
    }

    render(title: string, left: number, top: number): JSX.Element {
        return <SubroutineBlockEx title={title} left={left} top={top}/>;
    }

    getTitle(): string {
        return "Sub";
    }

    getLeft(): number {
        return 0;
    }

    getTop(): number {
        return 0;
    }

    setLeft(left: number): void {
    }

    setTop(top: number): void {
    }



}

 const SubroutineBlockEx = new SubroutineBlock().block
