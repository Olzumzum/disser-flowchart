import {IBlock} from "./IBlock";
import {ParentBlock} from "./ParentBlock";
import {BlockTypes} from "./BlockTypes";
import {CSSProperties} from "react";

export class Block implements IBlock {
    private _parentBlock: ParentBlock | undefined
    private _blockStyle: CSSProperties = {
        width: "120px",
        height: "120px",
    }

    constructor(id: string,
                left: number,
                top: number) {
        this._parentBlock = new ParentBlock(id, left, top)

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
        return this._blockStyle;
    }

    getTop(): number {
        return this._parentBlock?.getTop()!!;
    }

    getTypeBlock(): string {
        return BlockTypes.BLOCK;
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