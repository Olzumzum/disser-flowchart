import {CSSProperties} from "react";
import {IBlock} from "./IBlock";
import {ParentBlock} from "./ParentBlock";
import {LineCanvas} from "../../../canvas/LineCanvas";
import {getConditionShape, getInOutputShape} from "../../factory/BlockShapePainter";
import {BlockTypes} from "./BlockTypes";

const blockStyle: CSSProperties = {
    width: "120px",
    height: "120px",
}

export function getInOutputBlockStyle(){
    return blockStyle
}

export class InOutput implements IBlock {
    private _parentBlock: ParentBlock | undefined

    private _blockShape: LineCanvas[]

    constructor(id: string,
                left: number,
                top: number,
                parentId: string,
                innerLevel: number
    ) {
        this._parentBlock = new ParentBlock(id, left, top, this.getTypeBlock(),
            parentId, innerLevel, blockStyle)
        this._blockShape = getInOutputShape(blockStyle, left, top)
        this._parentBlock.setBlockShape(this._blockShape)
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

    getChildId(): string {
        return this._parentBlock?.getChildId()!!;
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
        return BlockTypes.INOUTPUT;
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

    setChildId(neighbor: string): void {
        this._parentBlock?.setChildId(neighbor)
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

    getBlockShape(): LineCanvas[] {
        return this._parentBlock?.getBlockShape()!!;
    }

    getNeighbourId(): string {
        return this._parentBlock?.getNeighbourId()!!;
    }

    setNeighbourId(id: string): void {
        this._parentBlock?.setNeighbourId(id)
    }
}