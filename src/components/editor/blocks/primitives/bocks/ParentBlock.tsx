import {CSSProperties, FC} from "react";
import blockImage from "../../../../../assets/images/romb.png";
import {IBlock} from "./IBlock";
import {LineCanvas} from "../../../canvas/LineCanvas";
import {contextCanvas} from "../../../canvas/CanvasPainter";
import {drawBlockShape} from "../../factory/BlockShapePainter";
import {BlockNestingContent} from "../../../block_internal_fields/BlockNestingContent";
import {ParameterManager} from "../../parameters/ParameterManager";
import {parameterManager} from "../../../panel/EditPanel";

/**
 * Родитель всех блоков
 * хранит всю основную информацию
 */

//типизация полей блока
export interface BlockProps {
    title?: string
    yellow?: boolean
    top?: number,
    left?: number
}


//построитель стилевых отличий каждого блока
interface StyleBlockBuilder {

}

export const DEFAULT_FOR_LINKS: string = "-1"

//общий стиль для блоков
// const stylesParentBlock: CSSProperties = {
//     border: '1px dashed gray',
//     padding: '1',
//     cursor: 'move',
//     width: "120px",
//     height: "100px",
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'contain',
//     display: "flex",
//     justifyContent: "center",
//     margin: "10px",
//     position: "absolute",
// }

// export function getStyleParentBlock(): CSSProperties {
//     return stylesParentBlock
// }


export class ParentBlock{

    //уникальный ключ
    private _id: string = ""

    //координаты блока
    private _top: number | undefined
    private _left: number | undefined

    //экземпляр класса
    private _blockInstance: React.FC<BlockProps> | undefined = undefined
    //тип блока
    private _typeBlock: string = ""

    //предыдущий блок
    private _parentId: string = DEFAULT_FOR_LINKS
    //последующий блок
    private _childId: string = DEFAULT_FOR_LINKS
    //соседний блок
    private _neighbourId: string = DEFAULT_FOR_LINKS

    //уровень вложенности блока
    private _innerLevel: number = 0
    //выражение, которое хранится в скобках
    private _parameterId: string = ""
    //комментарии из кода
    private _commentId: string = ""
    //массив линий для отрисовки формы блока
    private _blockShape: LineCanvas[] | undefined = undefined

    //свернут ли блок
    private _isRolledUp: boolean = false

    private _style: CSSProperties | undefined = undefined


    constructor(id: string,
                left: number,
                top: number,
                type: string,
                parentId: string,
                innerLevel: number,
                style: CSSProperties
    ) {
        this._id = id
        this._left = left
        this._top = top
        this._typeBlock = type
        this._parentId = parentId
        this._innerLevel = innerLevel
        this._style = style
        this._parameterId = parameterManager.createParameter()
    }

    public setBlockShape(shape: LineCanvas[]) {
        this.blockShape = shape
    }

    getStyleBlock() {
        return this.style
    }


    //создать экземпляр
    createBlock() {
        this._blockInstance = () => {
            return (
                <BlockNestingContent
                    id={this._id}
                    typeBlock={this._typeBlock}
                    left={this._left}
                    top={this._top}
                    isRollingUp={this._isRolledUp}
                    style={this._style}
                    idParameters={this._parameterId}
                />
            )
        }
    }

    //Отобразить
    render(): JSX.Element {
        if (this._blockShape !== undefined)
            this._blockShape =
                drawBlockShape(contextCanvas!!,
                    this._blockShape!!,
                    this._typeBlock,
                    this._style!!, this._left!!, this._top!!)

        return <this.blockInstance title={this._typeBlock}/>;
    }


    //вернуть экземпляр блок
    get blockInstance(): FC<BlockProps> {
        if (this._blockInstance === undefined)
            this.createBlock()

        return this._blockInstance!!;
    }

    get style(): CSSProperties {
        return this._style!!
    }

    get blockShape(): LineCanvas[] {
        return this._blockShape!!
    }

    set blockShape(lines: LineCanvas[]) {
        this._blockShape = lines
    }

    getId(): string {
        return this._id;
    }

    getTypeBlock(): string {
        return this._typeBlock;
    }

    getLeft(): number {
        return this._left!!;
    }

    setLeft(left: number): void {
        this._left = left
    }

    getTop(): number {
        return this._top!!;
    }

    setTop(top: number): void {
        this._top = top
    }

    getCommentId(): string {
        return this._commentId;
    }

    getInnerLevel(): number {
        return this._innerLevel;
    }

    getChildId(): string {
        return this._childId;
    }

    getParameterId(): string {
        return this._parameterId;
    }

    getParentId(): string {
        return this._parentId;
    }

    setCommentId(comment: string): void {
        this._commentId = comment
    }

    setInnerLevel(innerLevel: number): void {
        this._innerLevel = innerLevel
    }

    setChildId(neighbor: string): void {
        this._childId = neighbor
    }

    setParameterId(parameterId: string): void {
        this._parameterId = parameterId
    }

    setParentId(parentId: string): void {
        this._parentId = parentId
    }

    getBlockShape(): LineCanvas[] {
        return this.blockShape
    }

    getNeighbourId(): string {
        return "";
    }

    setNeighbourId(id: string): void {
    }

}






