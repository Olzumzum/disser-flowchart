import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {convert, rendersDragBlock} from "../dnd/RendrerManager";
import React, {CSSProperties} from "react";
import {convertStyleToReadableFormat} from "../calculat_coordinates/elementSizeCalc";
import {MIN_BLOCKS_DISTANCE} from "../calculat_coordinates/blockCoordinates";

export let styleContainerBlock: CSSProperties | undefined = undefined

export function changeStyleContainer(
    left: number,
    top: number,
): CSSProperties {
    styleContainerBlock = {
        position: 'absolute',
        zIndex: 3,
        border: "3px solid purple",
        margin: 0,
        top: top,
        left: left,
        height: "300px",
        width: "300px",
    }
    return styleContainerBlock
}

export class InnerLevelContainer {
    private _content = new Array<IBlock>()
    private _level: number = 0;

    private _top: number = 0
    private _left: number = 0

    constructor(level: number, parentId: string, left: number, top: number) {
        this._level = level

        this._left = left
        this._top = top
    }

    getCoorForBlock(id: string): number[] {
        let width = 0
        let height = 0
        this._content.forEach((item, i) => {
            if(!item.getId().localeCompare(id)){
                for(let j = 0; (j < this._content.length && j<i); j++){
                    width += convertStyleToReadableFormat(this._content[j].getStyleBlock().width)!!
                    height += convertStyleToReadableFormat(this._content[j].getStyleBlock().height)!!+ MIN_BLOCKS_DISTANCE
                }
            }
        })
        // console.log("width " + width)
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
    }

    render(): JSX.Element {
        return (
            <div className={"container"} style={changeStyleContainer(this._left, this._top)}>
                {Object.keys(this._content).map((id) =>
                    rendersDragBlock(convert(this._content)[Number(id)], id))
                }
            </div>
        )
    }
}