import {IBlock} from "./IBlock";
import {ParentBlock} from "./ParentBlock";
import {CSSProperties} from "react";
import {BlockTypes} from "./BlockTypes";
import {getConditionShape} from "../../factory/BlockShapePainter";
import {LineCanvas} from "../../../canvas/LineCanvas";
import {BlocksEventEmitter} from "../../../BlocksEmitter";
import {ContextMenuActionType} from "../../../context_menu/ContextMenuActionType";
import {COLOR_CONDITION} from "../../../../settings_panel/SettingsScreen";


const blockStyle: CSSProperties = {
    width: "300px",
    height: "200px",
    margin: "10px",
}

export function getConditionBlockStyle() {
    return blockStyle
}

export class Condition implements IBlock {
    private _parentBlock: ParentBlock | undefined

    private _blockShape: LineCanvas[]
    private _colorShape: string = COLOR_CONDITION

    constructor(id: string,
                left: number,
                top: number,
                parentId: string,
                innerLevel: number
    ) {
        this._parentBlock = new ParentBlock(id, left, top, this.getTypeBlock(),
            parentId, innerLevel, blockStyle)
        this._blockShape = getConditionShape(blockStyle, left, top)
        this._parentBlock.setBlockShape(this._blockShape)
        this._colorShape = COLOR_CONDITION
        console.log("color " + COLOR_CONDITION)
        BlocksEventEmitter.subscribe(ContextMenuActionType.PARAMETERS_FIELD_CLICK,
            (data: any) => {
            console.log("Получити " + data.type)
                if(!data.type.localeCompare(this.getTypeBlock())){
                    this._parentBlock!!.colorShape = data.color
                    // redrewCanvas()
                }
            })
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