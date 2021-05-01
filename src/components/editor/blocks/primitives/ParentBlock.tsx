import {CSSProperties, FC} from "react";
import blockImage from "../../../../assets/images/romb.png";
import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";
import {OverlayTrigger} from "react-bootstrap";
import {renderConvertPrompt} from "../../prompt/block_prompt";
import {ContextMenu} from "../../context_menu/BlockContextMenu";
import {itemsContexMenu} from "../../context_menu/ItemsContextMenu";
import {ContextMenuActionType} from "../../context_menu/ContextMenuActionType";
import {BlocksEventEmitter} from "../../BlocksEmitter";
import {calcSizeBlockCanvas, convertStyleToReadableFormat} from "../../calculat_coordinates/elementSizeCalc";
import {LinePartConnect} from "../../connections/LinePartConnect";
import {drawLine} from "../../connections/LinePainter";

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
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: "70px",
    height: "50px",
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

export class ParentBlock implements IBlock{

    //уникальный ключ
    private _id: string = ""

    //координаты блока
    private _top: number | undefined
    private _left: number | undefined

    //экземпляр класса
    private _blockInstance: React.FC<BlockProps> | undefined
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
    private _blockCanvas: LinePartConnect[] = []

    constructor(id: string,
                left: number,
                top: number) {

        this._id = id
        this._left = left
        this._top = top
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
                            id={this._id}
                            style={{...stylesParentBlock, background}}
                            onMouseDown={this.mouseDownClick}
                        >
                            {title}
                        </div>
                    </OverlayTrigger>
                    <ContextMenu menu={itemsContexMenu} showmenu={false} idBlock={this.getId()}/>
                </div>
            )
        }
    }

    //Отобразить
    render(): JSX.Element {
        // this.blockBackImg(blockImage)

        return <this.blockInstance title={this._typeBlock}
                                   left={this._left} top={this._top}/>;

    }

    getCanvasObject(ctx: CanvasRenderingContext2D): void {

        this._blockCanvas[0] = this.getLineFormBlock(ctx, this._left!!, this._top!!, true)
        this._blockCanvas[1] = this.getLineFormBlock(ctx, this._left!!, this._top!!, false)

        this._blockCanvas[2] = this.getLineFormBlock(ctx, this._left!!, this._top!! - 1
            + convertStyleToReadableFormat(stylesParentBlock.height)!!, true)

        this._blockCanvas[3] = this.getLineFormBlock(ctx,
            this._left!! + convertStyleToReadableFormat(stylesParentBlock.width)!! -1
            ,this._top!!, false)

    }

    getLineFormBlock(ctx: CanvasRenderingContext2D, left: number,
                     top: number, isHorizontal: boolean): LinePartConnect{
        let size = calcSizeBlockCanvas(stylesParentBlock, left, top, isHorizontal)!!
        return drawLine(ctx, size[0], size[1], size[2], size[3])
    }

    //вызов контекстного меню блока
    mouseDownClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.button === 2)
            BlocksEventEmitter.dispatch(ContextMenuActionType.CHANGE_SHOW_CONTEXT_MENU,
                this.getId())
    }

    //одинарное нажатие
    click(e: React.MouseEvent<HTMLElement>) {
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

    getId(): string {
        return this._id;
    }

    getTypeBlock(): string {
        return BlockTypes.BLOCK;
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

}






