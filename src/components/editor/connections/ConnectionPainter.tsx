import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {buildConnectOneBlock, scaleCoorConnection} from "../calculat_coordinates/connectionCoor";
import {contextCanvas} from "../canvas/CanvasPainter";
import {LineCanvas} from "../canvas/LineCanvas";
import {getHeightElement} from "../calculat_coordinates/elementSizeCalc";
import {getHeightEditPanel} from "../calculat_coordinates/panelCalc";
import {changingBlockCoor, getBlockById, getConnects} from "../../../store/action-creators/blocks";
import {ConnectionBlocks} from "../blocks/primitives/connects/ConnectionBlocks";
import {DEFAULT_FOR_LINKS} from "../blocks/primitives/bocks/ParentBlock";
import {MIN_BLOCKS_DISTANCE} from "../calculat_coordinates/blockCoordinates";
import {clearLines, drawLines} from "../canvas/LinePainter";
import {IConnect} from "../blocks/primitives/connects/IConnect";


/** ТОЛЩИНА РИСУЕМОЙ СВЯЗИ ПО УМОЛЧАНИЮ **/
export const CONNECTION_WIDTH = 1;

/** ВЕЛИЧИНА ДЛЯ ПОЛОВИНКИ СТРЕЛОЧКИ **/
const ARROW_HALF_WIDTH = 7;
const ARROW_HALF_HEIGHT = 5;

/**
 * Нарисовать связь между блокамии
 * @param itemOne
 * @param itemTwo
 */
export const paintConnection = (idItemOne: string, idItemTwo: string) => {

    const context = contextCanvas
    //значения координат
    let coor: any[] | null
    //создаваемая связь
    let connect: ConnectionBlocks

    //если блока первый - рисуем две стрелочки
    if (!idItemOne.localeCompare(DEFAULT_FOR_LINKS)) {
        coor = buildConnectOneBlock(idItemTwo, true)

        if (coor !== null) {
            createOneConnect(contextCanvas!!, coor, idItemOne, idItemTwo)

        }
        coor = buildConnectOneBlock(idItemTwo, false)
        if (coor !== null) {
            createOneConnect(contextCanvas!!,coor, idItemOne, idItemTwo)
        }

        //если не первый
    } else {
        const itemOne = getBlockById(idItemOne)
        const itemTwo = getBlockById(idItemTwo)

        //получаем общее расстояние между блоками
        coor = scaleCoorConnection(itemOne!!, itemTwo!!)
        if (context !== null && coor !== null) {

            //если блоки находятся по вертикали на одной прямой
            if (coor[0] === coor[2]) {
                createOneConnect(contextCanvas!!,coor, idItemOne, idItemTwo)
                //иначе
            } else {
                createComplexConnection(contextCanvas!!,coor, idItemOne, idItemTwo)
            }
        }
    }
}

/**
 * Создает сложную связь между блокми
 * @param ctx
 * @param coor - координаты расстояния между блоками
 * @param idItemOne - id блока, который первее в последовательности
 * @param idItemTwo - id блока, который идет следующим в последовательности
 */
function createComplexConnection(ctx: CanvasRenderingContext2D,coor: number[],
                                 idItemOne: string, idItemTwo: string){
    //ищет расстояние минимальное
    const partConnect = (MIN_BLOCKS_DISTANCE / 2) - CONNECTION_WIDTH

    const line0: LineCanvas =
        new LineCanvas(coor[0], coor[1], CONNECTION_WIDTH, partConnect)
    const line1: LineCanvas =
        new LineCanvas(coor[2], (coor[3] - partConnect), CONNECTION_WIDTH, partConnect)
    const line2: LineCanvas =
        new LineCanvas(coor[0], (coor[3] - partConnect), (coor[2] - coor[0]), CONNECTION_WIDTH)

    const connect = new ConnectionBlocks([line0, line1, line2], idItemOne, idItemTwo)
    drawLines(ctx, connect.getConnectLines())
}

/**
 * Создает простую связь между блоками (простая вертикальная линия)
 * @param ctx
 * @param coor - координаты расстояния между блоками
 * @param idItemOne - id блока, который первее в последовательности
 * @param idItemTwo - id блока, который идет следующим в последовательности
 */
export function createOneConnect(ctx: CanvasRenderingContext2D, coor: number[],
                          idItemOne: string, idItemTwo: string) : IConnect | undefined{

    const line0: LineCanvas = new LineCanvas(700, 360, 600, 400)

    const connect = new ConnectionBlocks([line0], idItemOne, idItemTwo)
    drawLines(ctx, connect.getConnectLines())
    // arrow(contextCanvas!!, [coor[0], (coor[1] + MIN_BLOCKS_DISTANCE)])
     return connect
}

export function ff(idParent: string, idNewBlock: string) : IConnect | undefined{

    // const connects = getConnects()
    // const coor = buildConnectOneBlock(idNewBlock, true)
    // console.log("coor connection " + coor!![0] + " " + coor!![1])
    // let conn: IConnect | undefined
    //
    // if (coor !== null) {
    //     conn = createOneConnect(contextCanvas!!, coor, idParent, idNewBlock)
    // }
    //
    // connects.push(conn!!)
    drawLines(contextCanvas!!, [new LineCanvas(700, 400, 700, 450)])
    // return conn
    return undefined
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
 * Рисует стрелочку :)
 * @param ctx
 * @param coor
 */
function arrow(ctx: CanvasRenderingContext2D, coor: number[]){
    const arrowCentre = CONNECTION_WIDTH / 2

    ctx.beginPath();
    ctx.moveTo(coor[0] + arrowCentre,coor[1]);
    ctx.lineTo(coor[0] - 6, coor[1] - 7);
    ctx.moveTo(coor[0] + arrowCentre,coor[1]);
    ctx.lineTo(coor[0] + 6, coor[1] - 7);

    ctx.stroke();
}


export function deleteConnect(idParent: string, idChanged: string){
    const connects = getConnects()

    connects.forEach(item => {
        const neighbors = item.getBlockIds()
        if(!neighbors[0].localeCompare(idParent) && !neighbors[1].localeCompare(idChanged)){
            clearLines(contextCanvas!!, item.getConnectLines())

        }
    })
}