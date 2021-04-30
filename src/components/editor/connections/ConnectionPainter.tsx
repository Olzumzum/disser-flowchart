import {IBlock} from "../blocks/primitives/IBlock";
import {buildConnectOneBlock, scaleCoorConnection} from "../calculat_coordinates/connectionCoor";
import {contextCanvas} from "./CanvasPainter";
import {LinePartConnect} from "./LinePartConnect";
import {getHeightElement} from "../calculat_coordinates/elementSizeCalc";
import {getHeightEditPanel} from "../calculat_coordinates/panelCalc";
import {changingBlockCoor, getBlockById} from "../../../store/action-creators/blocks";
import {ConnectionBlocks} from "./ConnectionBlocks";
import {DEFAULT_FOR_LINKS} from "../blocks/primitives/ParentBlock";
import {MIN_BLOCKS_DISTANCE} from "../calculat_coordinates/blockCoordinates";


/** ТОЛЩИНА РИСУЕМОЙ СВЯЗИ ПО УМОЛЧАНИЮ **/
export const CONNECTION_WIDTH = 1;
/** ЦВЕТ РИСУЕМОЙ СВЯЗИ **/
const CONNECTION_COLOR = '#000000';

/**
 * Нарисовать связь между блокамии
 * @param itemOne
 * @param itemTwo
 */
export const paintConnection = (idItemOne: string, idItemTwo: string) => {

    const context = contextCanvas
    //значения координат
    let coor: any[] | null
    if (!idItemOne.localeCompare(DEFAULT_FOR_LINKS)) {
        // coor = buildConnectOneBlock(idItemTwo, false)
        //
        // if (coor !== null) {
        //     const line0: LinePartConnect = new LinePartConnect(coor[0], coor[1], CONNECTION_WIDTH, 20)
        //     const connection0 = new ConnectionBlocks([line0])
        //
        //     console.log("conn " + context)
        //     paintMassLines(context!!, connection0)
        // }
        // coor = buildConnectOneBlock(idItemTwo, true)
        // if(coor !== null) {
        //     const line1: LinePartConnect = new LinePartConnect(coor[0], coor[1], CONNECTION_WIDTH, MIN_BLOCKS_DISTANCE)
        //     const connection1 = new ConnectionBlocks([line1])
        //     paintMassLines(context!!, connection1)
        // }


    } else {
        console.log("EnumNumberMember")
        const itemOne = getBlockById(idItemOne)
        const itemTwo = getBlockById(idItemTwo)

        coor = scaleCoorConnection(itemOne!!, itemTwo!!)
        if (context !== null && coor !== null) {

            const height = checkCoorBlocksByFollow(itemOne!!, itemTwo!!)

            if (height !== null) {
                if (coor[0] === coor[2]) {
                    const line: LinePartConnect = new LinePartConnect(coor[0], coor[1], CONNECTION_WIDTH, height)
                    const connection = new ConnectionBlocks([line])
                    paintMassLines(context, connection)

                } else {
                    const partConnect = (height / 2) - CONNECTION_WIDTH

                    const line0: LinePartConnect =
                        new LinePartConnect(coor[0], coor[1], CONNECTION_WIDTH, partConnect)
                    const line1: LinePartConnect =
                        new LinePartConnect(coor[2], (coor[3] - partConnect), CONNECTION_WIDTH, partConnect)
                    const line2: LinePartConnect =
                        new LinePartConnect(coor[0], (coor[3] - partConnect), (coor[2] - coor[0]), CONNECTION_WIDTH)

                    const connection = new ConnectionBlocks([line0, line1, line2])

                    paintMassLines(context, connection)
                }
            }
        }
    }
}

/**
 * Рисует связь, состаящую из массива прямых
 * @param context - контекст конвы, где рисуется связь
 * @param connection - рисуемая связь
 */
function paintMassLines(context: CanvasRenderingContext2D, connection: ConnectionBlocks) {
    const lines = connection.connection
    lines.forEach(line => {
        drawLine(context, line.x, line.y, line.width, line.height)
    })
}

/**
 * Проверка, находится ли ниже блок, чтобы нарисовать связь
 * @param itemOne - связываемый блок
 * @param itemTwo - - связываемый блок
 */
export const checkCoorBlocksByFollow = (itemOne: IBlock, itemTwo: IBlock): number | null => {
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
                  height: number): LinePartConnect => {
    const line = new LinePartConnect(x, y, width, height)

    ctx.fillStyle = CONNECTION_COLOR
    ctx.beginPath()
    ctx.fillRect(line.x, line.y, line.width, line.height)
    ctx.fill()

    return line
}