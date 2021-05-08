import {IBlock} from "../blocks/primitives/bocks/IBlock";
import React, {CSSProperties} from "react";
import {generateId} from "../blocks/factory/CreatorBlock";
import {calcCoorBlockDisplay, calcCoorInnerLevelContainer} from "./calcCoorContainerInnerLevel";
import {getBlockById} from "../../../store/action-creators/blocks";
import {InnerLevelComponent} from "./InnerLevelComponent";
import {BlocksEventEmitter as BlockEventEmitter, BlocksEventEmitter} from "../BlocksEmitter";
import {ContainerTypes} from "./ContainerTypes";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";

export class InnerLevelContainer {
    private _id = generateId()
    private _content = new Array<IBlock>()
    private _level: number = 0;
    private _parentId: string = ""
    private _top: number = 0
    private _left: number = 0
    private _width: number = 0
    private _height: number = 0

    isRolledUp: boolean = true
    context: boolean = false

    constructor(level: number, parentId: string, left: number, top: number) {
        this._level = level
        this._parentId = parentId

        BlockEventEmitter.subscribe(ContextMenuActionType.CLOSE_CONTEXT_MENU,
            () => {
                console.log("закрыли контекст")
                // this.context = false
            })

        BlockEventEmitter.subscribe(ContextMenuActionType.OVERLAP_CONTEXT_MENU,
            () => {
                console.log("открыли контекст")
                this.context  = true
            })
    }




    get parentId(): string | undefined {
        return this._parentId;
    }

    getStyle(): CSSProperties {
        return {
            position: 'absolute',
            zIndex: 2,
            border: "3px solid",
            margin: 0,
            top: this._top!!,
            left: this._left!!,
            height: this._height,
            width: this._width,
            // backgroundColor: "bisque",
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


    click = (e: React.MouseEvent<HTMLElement>) => {
        if(e.button === 0){
            if (this.context){
                this.context = false
            } else {
                this.isRolledUp = !this.isRolledUp
                BlocksEventEmitter.dispatch(ContainerTypes.IS_ROLLED, [this.isRolledUp, this._id])
            }
        }
    }

    render(): JSX.Element {

        return (
            <div onClick={this.click}>
                <InnerLevelComponent id={this._id} isOpened={this.isRolledUp}
                                     styleContainer={this.getStyle()} contentContainer={this._content}/>
            </div>
        )
    }
}