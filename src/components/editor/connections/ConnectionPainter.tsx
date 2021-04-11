import {IBlock} from "../blocks/primitives/IBlock";
import {scaleCoorConnection} from "../calculationCoordinats/connectionCalc";
import {contextCanvas} from "./CanvasPainter";
import {ConnectionBlocks} from "./ConnectionBlocks";
import {getHeightElement} from "../calculationCoordinats/elementSizeCalc";
import {blockMovement} from "../../../store/action-creators/blocks";

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
        checkCoorBlocksByFollow(itemOne, itemTwo)

        drawLine(context, coor[0], coor[1], 50, 150)
    }
}


export const checkCoorBlocksByFollow = (itemOne: IBlock, itemTwo: IBlock) =>{
    if (itemTwo !== null && itemOne !== null) {
        //высота блока, от которого строится начало связи
        const heightTwoBlock = getHeightElement(itemOne.getId())!!

        //нижняя координата
        const bottomCoorTwoBlock = itemOne.getTop() + heightTwoBlock
        //минимально допустимое расстояние между блоками
        const thresholdDistancBlocks = 10
        //новая координата блока, если он находится в неверном месте
        const newCoorValue = bottomCoorTwoBlock + thresholdDistancBlocks

        if (itemTwo.getTop() <= itemOne.getTop() || itemTwo.getTop() <= bottomCoorTwoBlock) {
            blockMovement(itemTwo, newCoorValue)
            return true
        } else {
            //расстояние между блоками
            const height: number = Math.abs(itemTwo.getTop() - bottomCoorTwoBlock)

            if (height >= thresholdDistancBlocks) return true
            else {
                blockMovement(itemTwo, newCoorValue)
                return true
            }
        }
    } else return false

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