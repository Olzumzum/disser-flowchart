import {IBlock} from "./IBlock";
import {ParentBlock} from "./ParentBlock";
import {CSSProperties} from "react";
import {BlockTypes} from "./BlockTypes";
import {getBlockShape, getConditionShape, getLoopShape} from "../../factory/BlockShapePainter";
import {contextCanvas} from "../../../canvas/CanvasPainter";
import {LineCanvas} from "../../../canvas/LineCanvas";

const blockStyle: CSSProperties = {
    width: "120px",
    height: "120px",
}

export function getLoopBlockStyle(){
    return blockStyle
}

export class Loop implements IBlock {
    private _parentBlock: ParentBlock | undefined

    private _blockShape: LineCanvas[]
    private _colorShape: string = '#000000'

    constructor(id: string,
                left: number,
                top: number,
                parentId: string,
                innerLevel: number
    ) {
        this._parentBlock = new ParentBlock(id, left, top, this.getTypeBlock(),
            parentId, innerLevel, blockStyle)
        this._blockShape = getLoopShape(blockStyle, left, top)
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
        return BlockTypes.LOOP;
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