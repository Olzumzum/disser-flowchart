import {IBlock} from "../blocks/primitives/IBlock";

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
    let coorItemOne: number[] | null = getCoorFromMiddleBlock(itemOne, false)
    //точка входа ItemTwo
    let coorItemTwo: number[] | null = getCoorFromMiddleBlock(itemTwo, true)

    //расстояние между блоками
    const height: number = Math.abs(itemTwo.getTop() - itemOne.getTop())
    const width: number = Math.abs(itemTwo.getLeft() - itemOne.getLeft())

    if (coorItemTwo !== null && coorItemOne !== null)
        return [
            coorItemOne[0], coorItemOne[1],
            coorItemTwo[0],coorItemTwo[1],
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
    const element = document.getElementById(block.getId()!!)
    if (element != null) {
        //получить мэрджин блока
        const marg = parseInt(window.getComputedStyle(element, null).margin)
        //координаты верха блока
        let left = block.getLeft() + marg
        let top = block.getTop() + marg

        const heightBlock = parseInt(window.getComputedStyle(element, null).height)
        const widthBlock = parseInt(window.getComputedStyle(element, null).width)

        left = left + (widthBlock / 2)
        if (isLower) {
            top = top + heightBlock
        }
        return [left, top]
    } else return null
}