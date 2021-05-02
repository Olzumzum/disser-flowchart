import {IBlock} from "../blocks/primitives/IBlock";
import {convertStyleToReadableFormat} from "./elementSizeCalc";
import {getBlockById} from "../../../store/action-creators/blocks";
import {MIN_BLOCKS_DISTANCE} from "./blockCoordinates";


/**
 * Вычисляет координаты для создаваемой связи,
 * входные параметры - блоки, между которыми создаются связи
 * @param itemOne
 * @param itemTwo
 * @return - первые 4 значения - координаты связей для первого и второго блока
 * 2 последних возвращаемых значения - height - расстояние между блоками по оси y,
 * width - расстояние между блоками по оси x
 */
export function scaleCoorConnection(itemOne: IBlock, itemTwo: IBlock): number[] | null {
    //точка входа itemOne
    let coorItemOne: number[] | null = getCoorFromMiddleBlock(itemOne, true)
    //точка входа ItemTwo
    let coorItemTwo: number[] | null = getCoorFromMiddleBlock(itemTwo, false)

    //расстояние между блоками
    const height: number = Math.abs(itemTwo.getTop() - itemOne.getTop())
    const width: number = Math.abs(itemTwo.getLeft() - itemOne.getLeft())

    if (coorItemTwo !== null && coorItemOne !== null)
        return [
            coorItemOne[0], coorItemOne[1],
            coorItemTwo[0], coorItemTwo[1],
            height, width
        ]
    else return null
}

/**
 * Вычислить координаты для создания связи
 * Связи рисуются от середины нижней/верхней грани блока
 * Выбор от какой (верхней или нижней) грани строится связь
 * делается в зависимости от значения флага isLower
 * @param block - блок для которого нужно вычислить координаты входа связи
 * @param isLower - true - строить связь от нижней грани, false - от верхней грани
 */
function getCoorFromMiddleBlock(block: IBlock, isLower: boolean): number[] | null {
    const styleBlock = block.getStyleBlock()
    if (styleBlock != null) {
        //получить мэрджин блока
        const marg = convertStyleToReadableFormat(styleBlock.margin)
        if (marg === undefined) console.log("Ошибка вычисления отсутпа")
        //координаты верха блока
        let left = block.getLeft() + marg!!
        let top = block.getTop() + marg!!

        const heightBlock = convertStyleToReadableFormat(styleBlock.height)
        const widthBlock = convertStyleToReadableFormat(styleBlock.width)

        left = left + (widthBlock!! / 2)
        if (isLower) {
            top = top + heightBlock!!
        }
        return [left, top]
    } else return null
}

export function buildConnectOneBlock(idBlock: string, isLower: boolean): number[] | null {
    const block = getBlockById(idBlock)
    if (block !== undefined) {
        let coorConnect = getCoorFromMiddleBlock(block, isLower)

        if (coorConnect !== null)
            if (isLower)
                return [
                    coorConnect[0], coorConnect[1],
                ]
            else return [
                coorConnect[0], coorConnect[1]- MIN_BLOCKS_DISTANCE,
            ]

        else return null;
    }
    return null;
}