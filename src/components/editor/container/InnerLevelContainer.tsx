import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {convert, rendersDragBlock} from "../dnd/RendrerManager";
import React, {CSSProperties} from "react";

const styleContainer: CSSProperties = {
    border: "3px solid purple",
    height: "300px",
    width: "300px",
    margin: 0,
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)"
}

function getStyleContainer(
    left: number,
    top: number,

): CSSProperties {

    return {
        position: 'absolute',
        zIndex: 3,
        border: "3px solid purple",
        margin: 0,
        top: top,
        left: left,
        height: "300px",
        width: "300px",
    }
}

export class InnerLevelContainer {
    private _content = new Array<IBlock>()
    private _level: number = 0;
    private _parentId: string =""
    private _top: number = 0
    private _left: number = 0

    constructor(level: number, parentId: string, left: number, top: number) {
        this._level = level
        this._parentId = parentId
        this._left = left
        this._top = top

    }

    get parentId(): string {
        return this._parentId;
    }

    set parentId(value: string) {
        this._parentId = value;
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

    render(): JSX.Element{
       return(
           <div className={"container"} style={getStyleContainer(this._left, this._top)}>
            {Object.keys(this._content).map((id) =>
                rendersDragBlock(convert(this._content)[Number(id)], id))
            }
        </div>
       )
    }
}