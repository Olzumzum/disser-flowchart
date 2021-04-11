import {IBlock} from "../blocks/primitives/IBlock";
import {scaleCoorConnection} from "../calculationCoordinats/connectionCalc";
import {contextCanvas} from "./CanvasPainter";
import {ConnectionBlocks} from "./ConnectionBlocks";
import {getHeightElement} from "../calculationCoordinats/elementSizeCalc";
import {getHeightEditPanel} from "../calculationCoordinats/panelCalc";

/** ШИРИНА РИСУЕМОЙ СВЯЗИ **/
const CONNECTION_WIDTH = 1;
/** ЦВЕТ РИСУЕМОЙ СВЯЗИ **/
const CONNECTION_COLOR = '#000000';

/**
 * Нарисовать связь между блокамии
 * @param itemOne
 * @param itemTwo
 */
export const paintConnection = (itemOne: IBlock, itemTwo: IBlock) => {
    const context = contextCanvas
    const coor: any[] | null = scaleCoorConnection(itemOne, itemTwo)
    if (context !== null && coor !== null) {
        checkCoorBlocksByFollow(itemTwo, itemOne)

        drawLine(context, coor[0], coor[1], 50, 150)
    }
}


function checkCoorBlocksByFollow(itemTwo: IBlock, itemOne: IBlock): boolean {
    if (itemOne !== null && itemTwo !== null) {
        //высота блока, от которого строится начало связи
        const heightTwoBlock = getHeightElement(itemTwo.getId())!!

        //нижняя координата
        const bottomCoorTwoBlock = itemTwo.getTop() + heightTwoBlock
        //минимально допустимое расстояние между блоками
        const thresholdDistancBlocks = 10
        //новая координата блока, если он находится в неверном месте
        const newCoorValue = bottomCoorTwoBlock + thresholdDistancBlocks

        if (itemOne.getTop() <= itemTwo.getTop() || itemOne.getTop() <= bottomCoorTwoBlock) {
            blockMovement(itemOne, newCoorValue)
            return true
        } else {
            //расстояние между блоками
            const height: number = Math.abs(itemOne.getTop() - bottomCoorTwoBlock)

            if (height >= thresholdDistancBlocks) return true
            else {
                blockMovement(itemOne, newCoorValue)
                return true
            }
        }
    } else return false

}

function blockMovement(block: IBlock, newCoorValue: number){
    const heightOneBlock = getHeightElement(block.getId())!!
    if(newCoorValue >= getHeightEditPanel()!!
        || (newCoorValue + heightOneBlock) >= getHeightEditPanel()!) console.log("Не перемещать")
    changingBlockCoor(block, newCoorValue, true)
}

function changingBlockCoor(block: IBlock, newCoorValue: number, isTop: boolean): IBlock {
    isTop ? block.setTop(newCoorValue) : block.setLeft(newCoorValue)
    return block
}


/**
 * Нарисовать прямую
 * @param ctx - конекст канвы, где происходит рисование
 * @param x - координата начала линии
 * @param y - координата начала линии
 * @param width - ширина линии
 * @param height - длинна линии
 */
const drawLine = (ctx: CanvasRenderingContext2D,
                  x: number,
                  y: number,
                  width: number,
                  height: number) => {
    const connect = new ConnectionBlocks(x, y, CONNECTION_WIDTH, height)

    ctx.fillStyle = CONNECTION_COLOR
    ctx.beginPath()
    ctx.fillRect(connect.x, connect.y, connect.width, connect.height)
    ctx.fill()
}