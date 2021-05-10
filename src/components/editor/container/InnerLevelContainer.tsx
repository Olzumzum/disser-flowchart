import {IBlock} from "../blocks/primitives/bocks/IBlock";
import React, {CSSProperties} from "react";
import {generateId} from "../blocks/factory/CreatorBlock";
import {calcCoorBlockDisplay, calcCoorInnerLevelContainer} from "./calcCoorContainerInnerLevel";
import {getBlockById} from "../../../store/action-creators/blocks";
import {InnerLevelComponent} from "./InnerLevelComponent";
import {BlocksEventEmitter as BlockEventEmitter, BlocksEventEmitter} from "../BlocksEmitter";
import {ContainerTypes} from "./ContainerTypes";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";
import {DEFAULT_FOR_LINKS} from "../blocks/primitives/bocks/ParentBlock";

/**
 * Сущность, отвечающая за определенный уровень равный для всех блоков,
 * порожденный одним родителем
 */
export class InnerLevelContainer {
    //уникальный идентификатор уровня
    private _id = generateId()
    //список блоков на данном уровне
    private _content = new Array<IBlock>()
    //уровень вложенности
    private _level: number = 0;
    //идентификатор родителя, породившего данный уровень
    private _parentId: string = ""

    //координаты и размеры
    private _top: number = 0
    private _left: number = 0
    private _width: number = 0
    private _height: number = 0

    private _isRolledUp: boolean = false
    context: boolean = false

    //вложено ли что-то в блок (вложен - если мы свернули детали реализации)
    private _isNesting: boolean = false

    constructor(level: number, parentId: string, left: number, top: number) {
        this._level = level
        this._parentId = parentId

        BlockEventEmitter.subscribe(ContextMenuActionType.OVERLAP_CONTEXT_MENU,
            () => {
                this.context = true
            })
    }

    //возвращает стиль блока
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
        }
    }

    /**
     * возвращает координаты для контента внутриблока,
     * тк они рисуются относительно граней контейнера
     */
    getCoorForBlock(id: string): number[] {
        let coor: number[] = [0, 0]
        this._content.forEach((item, i) => {
            if (!item.getId().localeCompare(id)) {
                coor = calcCoorBlockDisplay(getBlockById(id)!!, this._left, this._top)
            }
        })
        return coor
    }

    addContent(value: IBlock) {
        this._content.push(value)
        const coor = calcCoorInnerLevelContainer(this.content, this.parentId!!)
        this._left = coor[0]
        this._top = coor[1]
        this._width = coor[2]
        this._height = coor[3]
    }

    /**
     * Возвращает первый в последовательности на уровне блок
     */
    getFirstNode(): string | null {
        let result: string | null = null
        this.content.forEach(item => {
            if (!item.getParentId().localeCompare(this._parentId))
                result = item.getId()
        })
        return result
    }

    /**
     * обработка нажатия на блок (скрытие, свертка элементов)
     * @param e
     */
    click = (e: React.MouseEvent<HTMLElement>) => {
        console.log("Клик " + this.context)
        if (e.button === 0) {
            if (this.context) {
                this.context = false
            } else {
                console.log("тут")

                if (this._isNesting){

                    BlocksEventEmitter.dispatch(ContainerTypes.CLICK_BY_PARENT,
                        this._id)
                    this._isNesting = false
                } else if(!this.isRolledUp) {
                    this._isRolledUp = !this._isRolledUp

                    BlocksEventEmitter.dispatch(ContainerTypes.IS_ROLLED, [this._isRolledUp, this._id])
                }
            }
        }
    }

    /**
     * Возвращает последний в последовательности блоков на уровне блок
     */
    getLastNodeId(): string | null {
        //первый блок в контейнере
        let idStart: string = this.getFirstNode()!!
        let resultId: string | null = null
        let block = getBlockById(idStart)

        while (block?.getNeighborId().localeCompare(DEFAULT_FOR_LINKS)) {
            let nextBlock = getBlockById(block?.getNeighborId())
            resultId = nextBlock?.getId()!!
            block = nextBlock
        }

        return resultId
    }

    /**
     * отобразить список всех блоков на уровне
     */
    render(idILRolledUp: string): JSX.Element {
        let renderContent: Array<IBlock> = this.nestingCheck(idILRolledUp)

        return (
            <div onClick={this.click}>
                <InnerLevelComponent id={this._id} isOpened={true}
                                     styleContainer={this.getStyle()} contentContainer={renderContent}/>
            </div>
        )
    }

    nestingCheck(idILRolledUp: string): Array<IBlock>{
        let renderContent: Array<IBlock> = new Array<IBlock>()
        if (idILRolledUp !== undefined && idILRolledUp.localeCompare("empty")) {

            if (!this.id.localeCompare(idILRolledUp) && this.isRolledUp) {

                // renderContent.push(getBlockById(this.getFirstNode()!!)!!)
            } else {
                if(!this.isRolledUp)
                    this.content.forEach(item => renderContent.push(item))
            }
        } else {
            // console.log("Дэфолтное значение")
            this.content.forEach(item => renderContent.push(item))
        }
        return renderContent
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get isRolledUp(): boolean {
        return this._isRolledUp;
    }

    set isRolledUp(value: boolean) {
        this._isRolledUp = value;
    }

    get content(): IBlock[] {
        return this._content;
    }

    get id(): string {
        return this._id;
    }

    get parentId(): string | undefined {
        return this._parentId;
    }


    get isNesting(): boolean {
        return this._isNesting;
    }

    set isNesting(value: boolean) {
        this._isNesting = value;
    }
}