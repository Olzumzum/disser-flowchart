import {CSSProperties, FC} from "react";
import blockImage from "../../../../assets/images/romb.png";
import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";
import {OverlayTrigger} from "react-bootstrap";
import {renderConvertPrompt} from "../../prompt/block_prompt";
import {ContextMenu} from "../../context_menu/BlockContextMenu";
import {itemsContexMenu} from "../../context_menu/ItemsContextMenu";
import {ContextMenuEventEmitter} from "../../context_menu/ContextMenuEventEmitter"
import {ContextMenuActionType} from "../../context_menu/ContextMenuActionType";

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
    blockBackImg(img: string): void;
}

// function g(){
//     const c = stylesBlokc
// }

//общий стиль для блоков
const stylesBlokc: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: "40px",
    height: "40px",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'contain',
    display: "flex",
    justifyContent: "center",
    margin: "10px"
}

export function getStyleBlock(){
    return stylesBlokc
}

export class ParentBlock implements IBlock, StyleBlockBuilder {

    //общий стиль для блоков
    protected stylesBlokc: CSSProperties = {
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        cursor: 'move',
        width: "40px",
        height: "40px",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'contain',
        display: "flex",
        justifyContent: "center",
        margin: "10px"
    }


    private _id: string = ""
    //ссылка на следующий блок
    private _nextBlock: string | undefined = undefined
    //ссылка на предыдущий блок
    private _prevBlock: string | undefined = undefined
    //координаты блока
    private _top: number | undefined
    private _left: number | undefined
    //экземпляр класса
    private _blockInstance: React.FC<BlockProps> | undefined
    private _typeBlock: string = ""


    constructor(id: string,
                left: number,
                top: number) {

        this._id = id
        this._left = left
        this._top = top
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
                            style={{...this.style, background}}
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
        this.blockBackImg(blockImage)
        return <this.blockInstance title={this._typeBlock}
                                   left={this._left} top={this._top}/>;


    }

    //вызов контекстного меню блока
    mouseDownClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.button === 2)
            ContextMenuEventEmitter.dispatch(ContextMenuActionType.CHANGE_SHOW_CONTEXT_MENU,
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

    //задать фоновое изображение блока
    blockBackImg(img: string): void {
        this.stylesBlokc.backgroundImage = `url(${img})`
    }

    get style(): CSSProperties {
        return this.stylesBlokc
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

    getPreviousNeighbor(): string | undefined {
        return this._prevBlock;
    }

    setPreviousNeighbor(id: string): void {
        this._prevBlock = id
    }

    getSubsequentNeighbor(): string | undefined {
        return this._nextBlock;
    }

    setSubsequentNeighbor(id: string): void {
        this._nextBlock = id
    }

}






