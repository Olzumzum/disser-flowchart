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
import {clearLines} from "../canvas/LinePainter";
import {contextCanvas} from "../canvas/CanvasPainter";

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
    private _parentBlockId: string = ""

    //ссылка на контейнер-родитель
    private _parentId: string = DEFAULT_FOR_LINKS
    //ссылка на соседа справа
    private _neighboursId: string = DEFAULT_FOR_LINKS
    //ссылка на крайнего левого потомка
    private _childId: string = DEFAULT_FOR_LINKS

    //координаты и размеры
    private _top: number = 0
    private _left: number = 0
    private _width: number = 0
    private _height: number = 0

    //свернут ли блок
    private _isRolledUp: boolean = false
    //нажатием на блок вызывалось контекстное меню или нет
    isContext: boolean = false
    //вложено ли что-то в блок (вложен - если мы свернули детали реализации)
    private _isNesting: boolean = false

    private _isParameterClick: boolean = false

    constructor(level: number, parentId: string, left: number, top: number) {
        this._level = level
        this._parentBlockId = parentId

        BlockEventEmitter.subscribe(ContextMenuActionType.OVERLAP_CONTEXT_MENU,
            () => {
                this.isContext = true
            })

        BlockEventEmitter.subscribe(ContextMenuActionType.PARAMETERS_FIELD_CLICK,
            () => {
            this._isParameterClick = true
        })

        BlockEventEmitter.subscribe(ContextMenuActionType.CANCELING_PARAMETER,
            () => {
                this._isParameterClick = false
            })
    }



    //возвращает стиль блока
    getStyle(): CSSProperties {

        return {
            position: 'absolute',
            zIndex: 2,
            border: "3px dashed #7d7d7d",
            margin: 0,
            top: this._top!!,
            left: this._left!!,
            height: this._height,
            width: this._width,
        }
    }

    getDefaultStyle(): CSSProperties {
        return {
            position: 'absolute',
            zIndex: 2,
            // border: "3px solid",
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
        const coor = calcCoorInnerLevelContainer(this.content, this.parentBlockId!!)
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
            if (!item.getParentId().localeCompare(this._parentBlockId))
                result = item.getId()
        })
        return result
    }

    /**
     * обработка нажатия на блок (скрытие, свертка элементов)
     * @param e
     */
    click = (e: React.MouseEvent<HTMLElement>) => {
        if (e.button === 0) {
            if (this.isContext) {

                this.isContext = false
            } else {
                console.log("контекст " + this._isParameterClick)
                //проверка клика на родителя
                if (this._isNesting){
                    console.log("тут нест")
                    BlocksEventEmitter.dispatch(ContainerTypes.CLICK_BY_PARENT,
                        this._id)
                    this._isNesting = false
                    //проверка свертки
                } else if(!this.isRolledUp && !this._isParameterClick) {
                    console.log("тут")
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

        while (block?.getChildId().localeCompare(DEFAULT_FOR_LINKS)) {
            let nextBlock = getBlockById(block?.getChildId())
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
    if (renderContent.length !== 0)
        this.isRolledUp = false


        let style: CSSProperties
        if(this._isRolledUp) style = this.getDefaultStyle()
        else style = this.getStyle()

        return (
            <div onClick={this.click}>
                <InnerLevelComponent id={this._id}
                                     isOpened={this._isRolledUp}
                                     styleContainer={style}
                                     contentContainer={renderContent}
                                     top={this._top}
                                     left={this._left}
                                     height={this._height}
                                     width={this._width}
                />
            </div>
        )
    }

    /**
     * Проверка свернутости
     * @param idILRolledUp
     */
    nestingCheck(idILRolledUp: string): Array<IBlock>{
        let renderContent: Array<IBlock> = new Array<IBlock>()
        this._content.forEach(item => {
            clearLines(contextCanvas!!, item.getBlockShape())
        })

        if (idILRolledUp !== undefined && idILRolledUp.localeCompare("empty")) {
            // console.log("idR " + this.id + " " + this.isRolledUp)
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
        // console.log("renderCon " + idILRolledUp)
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

    get parentBlockId(): string | undefined {
        return this._parentBlockId;
    }


    get isNesting(): boolean {
        return this._isNesting;
    }

    set isNesting(value: boolean) {
        this._isNesting = value;
    }


    get top(): number {
        return this._top;
    }

    set top(value: number) {
        this._top = value;
    }

    get left(): number {
        return this._left;
    }

    set left(value: number) {
        this._left = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }


    get neighboursId(): string {
        return this._neighboursId;
    }

    set neighboursId(value: string) {
        this._neighboursId = value;
    }

    get childId(): string {
        return this._childId;
    }

    set childId(value: string) {
        this._childId = value;
    }


    get parentId(): string {
        return this._parentId;
    }

    set parentId(value: string) {
        this._parentId = value;
    }
}