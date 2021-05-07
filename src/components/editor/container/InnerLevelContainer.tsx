import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {convert, rendersDragBlock} from "../dnd/RendrerManager";
import React, {CSSProperties} from "react";
import {convertStyleToReadableFormat} from "../calculat_coordinates/elementSizeCalc";
import {MIN_BLOCKS_DISTANCE} from "../calculat_coordinates/blockCoordinates";
import {generateId} from "../blocks/factory/CreatorBlock";

// export


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
        this._left = left
        this._top = top
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
        let width = 0
        let height = 0
        this._content.forEach((item, i) => {
            if (!item.getId().localeCompare(id)) {
                for (let j = 0; (j < this._content.length && j < i); j++) {
                    width += convertStyleToReadableFormat(this._content[j].getStyleBlock().width)!!
                    height += convertStyleToReadableFormat(this._content[j].getStyleBlock().height)!! + MIN_BLOCKS_DISTANCE
                }
            }
        })
        return [width, height]
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
        this._width += convertStyleToReadableFormat(value.getStyleBlock().width)!!
        this._height += convertStyleToReadableFormat(value.getStyleBlock().height)!!
    }

    rolleUP(){
        this.isRolledUp = !this.isRolledUp
    }


    render(): JSX.Element {

        return (

            <div id={this._id} className={this._id}
                 style={this.getStyle()} >
                <h6> {this._id}</h6>
                {Object.keys(this._content).map((id) =>
                    rendersDragBlock(convert(this._content)[Number(id)], id))
                }
            </div>
        )
    }
}