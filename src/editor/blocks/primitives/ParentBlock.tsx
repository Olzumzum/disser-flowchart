import {CSSProperties, FC} from "react";
import blockImage from "../../../assets/images/block.png";

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

export class ParentBlock implements StyleBlockBuilder {

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

    //ссылка на следующий блок
    private _nextBlock: object | undefined = undefined
    //ссылка на предыдущий блок
    private _prevBlock: object | undefined = undefined
    //координаты блока
    private _top: number | undefined
    private _left: number | undefined
    //экземпляр класса
    private _blockInstance: FC<BlockProps> | undefined


    //создать экземпляр
    createBlock() {
        this._blockInstance = ({title, yellow, left, top}) => {
            this._left = 0
            this._top = top
            const background = yellow ? 'yellow' : blockImage
            return <div style={{...this.style, background}} onClick={this.click}>{title}</div>
        }
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


    click(e: React.MouseEvent<HTMLElement>) {

        console.log("click click " + toString.call(this))
    }

    set nextBlock(next: object) {
        this._nextBlock = next
    }

    set prevBlock(prev: object) {
        this._prevBlock = prev
    }

    get getNextBlock(): object | undefined {
        return this._nextBlock
    }

    get getPrevBlock(): object | undefined {
        return this._prevBlock
    }

}
