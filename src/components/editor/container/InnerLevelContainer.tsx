import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {convert, rendersDragBlock} from "../dnd/RendrerManager";
import React, {CSSProperties} from "react";
import {generateId} from "../blocks/factory/CreatorBlock";
import {calcCoorBlockDisplay, calcCoorInnerLevelContainer} from "./calcCoorContainerInnerLevel";
import {getBlockById} from "../../../store/action-creators/blocks";
import {InnerLevelComponent} from "./InnerLevelComponent";

export class InnerLevelContainer {
    private _id = generateId()
    private _content = new Array<IBlock>()
    private _level: number = 0;
    private _parentId: string = ""
    private _top: number = 0
    private _left: number = 0
    private _width: number = 0
    private _height: number = 0

    private isRolledUp = false

    constructor(level: number, parentId: string, left: number, top: number) {
        this._level = level
        this._parentId = parentId
    }


    get parentId(): string | undefined {
        return this._parentId;
    }

    getStyle(): CSSProperties {
        return {
            position: 'absolute',
            zIndex: 3,
            border: "3px solid",
            margin: 0,
            top: this._top!!,
            left: this._left!!,
            height: this._height,
            width: this._width,
        }
    }

    getCoorForBlock(id: string): number[] {
        let coor: number[] = [0, 0]
        this._content.forEach((item, i) => {
            if (!item.getId().localeCompare(id)) {
                coor = calcCoorBlockDisplay(getBlockById(id)!!, this._left, this._top)
            }
        })
        return coor
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get content(): IBlock[] {
        return this._content;
    }

    addContent(value: IBlock) {
        this._content.push(value)
        const coor = calcCoorInnerLevelContainer(this.content, this.parentId!!)
        this._left = coor[0]
        this._top = coor[1]
        this._width = coor[2]
        this._height = coor[3]
    }

    rolleUP() {
        this.isRolledUp = !this.isRolledUp
    }


    render(): JSX.Element {

        return (
           <InnerLevelComponent id={this._id}
                                styleContainer={this.getStyle()} contentContainer={this._content}/>
        )
    }
}