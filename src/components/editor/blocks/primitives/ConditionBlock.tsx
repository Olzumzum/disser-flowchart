import {BlockProps, ParentBlock} from "./ParentBlock";
import {FC} from "react";
import blockImage from "../../../../assets/images/romb.png";
import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";


export class ConditionBlockParent implements IBlock {

    //родитель всех блоков, общие методы
    private parentBlock: ParentBlock = new ParentBlock()
    //экземпляр класса
    private _blockCondInstance: FC<BlockProps> | undefined
    private title = "Condition"

    constructor(
        id: string,
        left: number,
        top: number
    ) {
        this.parentBlock.id = id
        this.parentBlock.left = left
        this.parentBlock.top = top
    }


    //вернуть экземпляр класса
    get block(): React.FC<BlockProps> {

            this.parentBlock.blockBackImg(blockImage)
            this._blockCondInstance = this.parentBlock.blockInstance

        return this._blockCondInstance!!;
    }

    getId(): string {
        return this.parentBlock.id!!;
    }

    getTypeBlock(): string {
        return BlockTypes.CONDITION;
    }

    setId(id: number): void {
    }

    setTypeBlock(type: string): void {
    }

    render(): JSX.Element {

        return <this.block title={this.title}
                               left={this.parentBlock.left} top={this.parentBlock.top}/>;
    }

    getTitle(): string {
        return this.title;
    }

    getLeft(): number {
        return this.parentBlock.left;
    }

    getTop(): number {
        return this.parentBlock.top;
    }

    setLeft(left: number): void {
        this.parentBlock.left = left;
    }

    setTop(top: number): void {
        this.parentBlock.top = top;
    }

    setPreviousNeighbor(id: string): void {
        this.parentBlock.prevBlock = id
    }

    setSubsequentNeighbor(id: string): void {
        this.parentBlock.nextBlock = id
    }

    getPreviousNeighbor(): string {
        return this.parentBlock.prevBlock;
    }

    getSubsequentNeighbor(): string {
        return this.parentBlock.nextBlock;
    }


}

