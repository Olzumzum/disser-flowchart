import {CSSProperties, FC} from "react";
import blockImage from "../../../../assets/images/romb.png";
import {oneClickBlock} from "../../../../store/action-creators/clickOnBlocks";
import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";
import {CONVERT_PROMPT} from "../../../../assets/strings/editor_strings";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {renderTooltip} from "../../prompt/block_prompt";



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

export class ParentBlock implements IBlock, StyleBlockBuilder {

    //общий стиль для блоков
    protected styles: CSSProperties = {
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
                <OverlayTrigger
                placement={"right"}
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}>
                    <div
                        id={this._id}
                        style={{...this.style, background}}
                        onDoubleClick={this.dbclick}
                        onMouseOver={this.showPrompt}

                    >
                        {title}
                    </div>
                 </OverlayTrigger>
            )
        }
    }

    showPrompt() {
        return <h5>{CONVERT_PROMPT}</h5>
    }

    //одинарное нажатие
    click(e: React.MouseEvent<HTMLElement>) {
        oneClickBlock(e.currentTarget.id)
    }

    //двойное нажатие
    dbclick(e: React.MouseEvent<HTMLElement>) {
        // console.log("dbclick " + e.currentTarget.id)
    }

    //вернуть экземпляр блока
    get blockInstance(): FC<BlockProps> {
        if (this._blockInstance === undefined)
            this.createBlock()

        return this._blockInstance!!;
    }

    //задать фоновое изображение блока
    blockBackImg(img: string): void {
        this.styles.backgroundImage = `url(${img})`
    }

    get style(): CSSProperties {
        return this.styles
    }

    getId(): string {
        return this._id;
    }

    getLeft(): number {
        return this._left!!;
    }

    getPreviousNeighbor(): string | undefined {
        return this._prevBlock;
    }

    getSubsequentNeighbor(): string | undefined {
        return this._nextBlock;
    }

    getTitle(): string {
        return "";
    }

    getTop(): number {
        return this._top!!;
    }

    getTypeBlock(): string {
        return BlockTypes.BLOCK;
    }


    render(): JSX.Element {
        this.blockBackImg(blockImage)
        return <this.blockInstance title={this._typeBlock}
                                   left={this._left} top={this._top}/>;


    }

    setLeft(left: number): void {
        this._left = left
    }

    setPreviousNeighbor(id: string): void {
        this._prevBlock = id
    }

    setSubsequentNeighbor(id: string): void {
        this._nextBlock = id
    }

    setTop(top: number): void {
        this._top = top
    }

}


