import {IBlock} from "../blocks/primitives/IBlock";
import {scaleCoorConnection} from "../calculationCoordinats/connectionCalc";
import {contextCanvas} from "./CanvasPainter";
import {ConnectionBlocks} from "./ConnectionBlocks";
import {getHeightElement} from "../calculationCoordinats/elementSizeCalc";
import {getHeightEditPanel} from "../calculationCoordinats/panelCalc";
import {changingBlockCoor} from "../../../store/action-creators/blocks";

/** ТОЛЩИНА РИСУЕМОЙ СВЯЗИ ПО УМОЛЧАНИЮ **/
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
        console.log("coord " + coor!![0] + " " + coor!![1] +
            " coord " + coor!![2] + " " + coor!![3])
        const height = checkCoorBlocksByFollow(itemOne, itemTwo)

        if(height !== null) {
            if (coor[0] === coor[2]) drawLine(context, coor[0], coor[1], CONNECTION_WIDTH, height)
            else {
                const partConnect = (height / 2) - CONNECTION_WIDTH
                drawLine(context, coor[0], coor[1], CONNECTION_WIDTH, partConnect)
                drawLine(context, coor[2], (coor[3] - partConnect),
                    CONNECTION_WIDTH, partConnect)
                drawLine(context, (coor[0]), (coor[3] - partConnect),
                    (coor[2] - coor[0]), CONNECTION_WIDTH)
            }
        }
    }
}

/**
 * Проверка, находится ли ниже блок, чтобы нарисовать связь
 * @param itemOne - связываемый блок
 * @param itemTwo - - связываемый блок
 */
export const checkCoorBlocksByFollow = (itemOne: IBlock, itemTwo: IBlock): number | null =>{
    if (itemTwo !== null && itemOne !== null) {
        //высота блока, от которого строится начало связи
        const heightTwoBlock = getHeightElement(itemOne.getId())!!
        //нижняя координата
        const bottomCoorTwoBlock = itemOne.getTop() + heightTwoBlock
        //минимально допустимое расстояние между блоками
        const thresholdDistancBlocks = 10
        //новая координата блока, если он находится в неверном месте
        const newCoorValue = bottomCoorTwoBlock + thresholdDistancBlocks
        //расстояние между блоками
        const height: number = Math.abs(itemTwo.getTop() - bottomCoorTwoBlock)

        if (itemTwo.getTop() <= itemOne.getTop() || itemTwo.getTop() <= bottomCoorTwoBlock) {
            blockMovement(itemTwo, newCoorValue)
            return height
        } else {

            if (height >= thresholdDistancBlocks) return height
            else {
                blockMovement(itemTwo, newCoorValue)
                return Math.abs(itemTwo.getTop() - bottomCoorTwoBlock)
            }
        }
    } else return null

}

/**
 * Переместить блок по вертикали (новая координата y)
 * @param block - перемещаемый блок
 * @param newCoorValue - новое значение координаты
 */
export const blockMovement = (block: IBlock, newCoorValue: number) => {
    const heightOneBlock = getHeightElement(block.getId())!!
    if (newCoorValue >= getHeightEditPanel()!!
        || (newCoorValue + heightOneBlock) >= getHeightEditPanel()!) console.log("Не перемещать")
    return changingBlockCoor(block.getId()!!, -1, newCoorValue)
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
    const connect = new ConnectionBlocks(x, y, width, height)

    ctx.fillStyle = CONNECTION_COLOR
    ctx.beginPath()
    ctx.fillRect(connect.x, connect.y, connect.width, connect.height)
    ctx.fill()
}