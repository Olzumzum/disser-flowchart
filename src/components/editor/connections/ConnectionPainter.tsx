import {IBlock} from "../blocks/primitives/IBlock";
import {scaleCoorConnection} from "../calculationCoordinats/connectionCalc";
import {contextCanvas} from "./CanvasPainter";
import {ConnectionBlocks} from "./ConnectionBlocks";
import {getHeightElement} from "../calculationCoordinats/elementSizeCalc";

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
        const result = checkCoorBlocksByFollow(itemTwo, itemOne)

        if (typeof result === "boolean") console.log("boolean")
        else if (typeof result === "object") console.log("IBlock")

        drawLine(context, coor[0], coor[1], 50, 150)
    }
}


function checkCoorBlocksByFollow(itemTwo: IBlock, itemOne: IBlock): IBlock | boolean {
    if (itemOne !== null && itemTwo !== null) {
        const heightTwoBlock = getHeightElement(itemTwo.getId())!!
        const heightOneBlock = getHeightElement(itemOne.getId())!!

        const height: number = Math.abs(itemOne.getTop() - (itemTwo.getTop()+ heightTwoBlock))

        const thresholdDistancBlocks = itemTwo.getTop() - heightTwoBlock
        console.log("he " + heightTwoBlock)
        console.log("threshold " + thresholdDistancBlocks + " height " + height)
        if (height > thresholdDistancBlocks) return true
        else {
            console.log("Переместить блоки")
            const newHeightValue: number = thresholdDistancBlocks
            itemOne.setTop(newHeightValue)
            return itemOne
        }
    }
    return false
}

function getNewHeight() {

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