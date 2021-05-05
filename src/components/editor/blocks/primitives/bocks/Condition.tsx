import {IBlock} from "./IBlock";
import {ParentBlock} from "./ParentBlock";
import {CSSProperties} from "react";
import {BlockTypes} from "./BlockTypes";
import {getBlockShape, getConditionShape} from "../../factory/BlockShapePainter";
import {contextCanvas} from "../../../canvas/CanvasPainter";
import {LineCanvas} from "../../../canvas/LineCanvas";

const blockStyle: CSSProperties = {
    width: "120px",
    height: "120px",
}

export function getConditionBlockStyle(){
    return blockStyle
}

export class Condition implements IBlock {
    private _parentBlock: ParentBlock | undefined

    private _blockShape: LineCanvas[]

    constructor(id: string,
                left: number,
                top: number) {
        this._parentBlock = new ParentBlock(id, left, top, this.getTypeBlock())
        this._blockShape = getConditionShape(blockStyle, left, top)
        this._parentBlock.setBlockShape(this._blockShape)
    }

    getColLine(): number {
        return this._parentBlock?.getColLine()!!;
    }

    getCommentId(): string {
        return "";
    }

    getId(): string {
        return this._parentBlock?.getId()!!;
    }

    getInnerLevel(): number {
        return this._parentBlock?.getInnerLevel()!!;
    }

    getLeft(): number {
        return this._parentBlock?.getLeft()!!;
    }

    getNeighborId(): string {
        return this._parentBlock?.getNeighborId()!!;
    }

    getParameterId(): string {
        return this._parentBlock?.getParameterId()!!;
    }

    getParentId(): string {
        return this._parentBlock?.getParentId()!!;
    }

    getStyleBlock(): React.CSSProperties {
        return blockStyle;
    }

    getTop(): number {
        return this._parentBlock?.getTop()!!;
    }

    getTypeBlock(): string {
        return BlockTypes.CONDITION;
    }

    render(): JSX.Element {
        return this._parentBlock?.render()!!;
    }

    setCommentId(commentId: string): void {
        this._parentBlock?.setCommentId(commentId)
    }

    setInnerLevel(innerLevel: number): void {
        this._parentBlock?.setInnerLevel(innerLevel)
    }

    setLeft(left: number): void {
        this._parentBlock?.setLeft(left)
    }

    setNeighborId(neighbor: string): void {
        this._parentBlock?.setNeighborId(neighbor)
    }

    setParameterId(parameterId: string): void {
        this._parentBlock?.setParameterId(parameterId)
    }

    setParentId(parentId: string): void {
        this._parentBlock?.setParentId(parentId)
    }

    setTop(top: number): void {
        this._parentBlock?.setTop(top)
    }
}