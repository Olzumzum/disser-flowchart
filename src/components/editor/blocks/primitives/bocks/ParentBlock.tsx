import {CSSProperties, FC} from "react";
import blockImage from "../../../../../assets/images/romb.png";
import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";
import {Container, OverlayTrigger} from "react-bootstrap";
import {renderConvertPrompt} from "../../../prompt/block_prompt";
import {ContextMenu} from "../../../context_menu/BlockContextMenu";
import {itemsContexMenu} from "../../../context_menu/ItemsContextMenu";
import {ContextMenuActionType} from "../../../context_menu/ContextMenuActionType";
import {LineCanvas} from "../../../canvas/LineCanvas";
import {contextCanvas} from "../../../canvas/CanvasPainter";
import {drawBlockShape} from "../../factory/BlockShapePainter";
import {ContextMenuEmitter} from "../../../context_menu/ContextMenuEmitter";

/**
 * Родитель всех блоков
 * хранит всю основную информацию
 */

//типизация полей блока
export interface BlockProps {
    title: string
    yellow?: boolean
    top?: number,
    left?: number
}


//построитель стилевых отличий каждого блока
interface StyleBlockBuilder {

}

export const DEFAULT_FOR_LINKS: string = "-1"

//общий стиль для блоков
const stylesParentBlock: CSSProperties = {
    border: '1px dashed gray',
    padding: '1',
    cursor: 'move',
    width: "120px",
    height: "100px",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'contain',
    display: "flex",
    justifyContent: "center",
    margin: "10px"
}

export function getStyleParentBlock(): CSSProperties {
    return stylesParentBlock
}

export class ParentBlock implements IBlock {

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
    private _neighborId: string = DEFAULT_FOR_LINKS
    //уровень вложенности блока
    private _innerLevel: number = -1
    //выражение, которое хранится в скобках
    private _parameterId: string = ""
    //комментарии из кода
    private _commentId: string = ""
    //массив линий для отрисовки формы блока
    private _blockShape: LineCanvas[] | undefined = undefined

    //стили для строчек блока
    private _rowStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    }

    constructor(id: string,
                left: number,
                top: number,
                type: string) {
        this._id = id
        this._left = left
        this._top = top
        this._typeBlock = type
    }

    public setBlockShape(shape: LineCanvas[]) {
        this.blockShape = shape
    }

    getStyleBlock() {
        return stylesParentBlock
    }

    //создать экземпляр
    createBlock() {
        this._blockInstance = ({
                                   title,
                                   yellow,
                                   left,
                                   top
                               }) => {
            this._left = left
            this._top = top
            const background = yellow ? 'yellow' : blockImage
            return (
                <div>
                    <OverlayTrigger
                        placement={"right"}
                        delay={{show: 250, hide: 400}}
                        overlay={renderConvertPrompt}>
                        <div
                            id={this.getId()}
                            style={{...stylesParentBlock, background}}
                            onMouseDown={this.mouseDownClick}
                            onClick={this.click}
                        >
                            <Container>
                                <div>
                                    {this._id}
                                </div>
                                <div>
                                    {this.getTypeBlock()}
                                </div>
                                <div>
                                    какие-то параметры
                                </div>
                            </Container>
                        </div>
                    </OverlayTrigger>
                    <ContextMenu menu={itemsContexMenu} idBlock={this._id}/>
                </div>
            )
        }
    }

    //Отобразить
    render(): JSX.Element {
        if (this._blockShape !== undefined)
            this._blockShape =
                drawBlockShape(contextCanvas!!, this._blockShape!!, stylesParentBlock, this._left!!, this._top!!)
        return <this.blockInstance title={this._typeBlock}
                                   left={this._left} top={this._top}/>;
    }


    /**
     * вызов контекстного меню блока
     * @param e
     */
    mouseDownClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.button === 2)
            ContextMenuEmitter.dispatch(ContextMenuActionType.CHANGE_SHOW_CONTEXT_MENU,
                {idBlock: this.getId()})
    }

    //одинарное нажатие
    click() {

    }

    //вернуть экземпляр блока
    get blockInstance(): FC<BlockProps> {
        if (this._blockInstance === undefined)
            this.createBlock()

        return this._blockInstance!!;
    }

    // //задать фоновое изображение блока
    // blockBackImg(img: string): void {
    //     this.stylesBlokc.backgroundImage = `url(${img})`
    // }

    get style(): CSSProperties {
        return stylesParentBlock
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

    getNeighborId(): string {
        return this._neighborId;
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

    setNeighborId(neighbor: string): void {
        this._neighborId = neighbor
    }

    setParameterId(parameterId: string): void {
        this._parameterId = parameterId
    }

    setParentId(parentId: string): void {
        this._parentId = parentId
    }

    getColLine(): number {
        if (this._blockShape !== undefined)
            return this._blockShape?.length;
        else return -1
    }

}






