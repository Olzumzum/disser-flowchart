import {convertStyleToReadableFormat} from "../../calculat_coordinates/elementSizeCalc";
import {clearLines, drawLines} from "../../canvas/LinePainter";
import {LineCanvas} from "../../canvas/LineCanvas";
import {CSSProperties} from "react";
import {BlockTypes} from "../primitives/bocks/BlockTypes";

/**
 * Отрисовывает форму блока в нужном месте,
 * стирает предыдущую отрисовку
 * @param ctx - контекст канвы, где отрисовывается блок
 * @param blockShape - массив линий формы блока
 */
export function drawBlockShape(ctx: CanvasRenderingContext2D,
                               blockShape: LineCanvas[],
                               typeBlock: string,
                               styleBlock: CSSProperties,
                               left: number,
                               top: number,
                               color: string
): LineCanvas[] {

    clearLines(ctx, blockShape)

    switch (typeBlock) {
        case BlockTypes.BLOCK:
            blockShape = getBlockShape(styleBlock, left, top);
            break;
        case BlockTypes.CONDITION:
            blockShape = getConditionShape(styleBlock, left, top);
            break;
        case BlockTypes.LOOP:
            blockShape = getLoopShape(styleBlock, left, top);
            break;
        case BlockTypes.INOUTPUT:
            blockShape = getInOutputShape(styleBlock, left, top);
            break;
    }

    drawLines(ctx, blockShape, color)
    return blockShape
}



/**
 * Подсчитывает координаты линий блока
 * Для квадратной формы блока
 * @param ctx - контекст канвы, где отрисовывается блок
 * @param styleBlock - стиль блока
 * @param left - координата
 * @param top - координата
 */
export function getBlockShape(styleBlock: CSSProperties,
                              left: number,
                              top: number) {

    //размер блока
    let size = [convertStyleToReadableFormat(styleBlock.width),
        convertStyleToReadableFormat(styleBlock.height)]

    //вернхняя левая координата блока
    const topPointBlock = getCoorWithAllIndents(styleBlock, left, top)
    //гор
    const l0 = new LineCanvas(topPointBlock[0], topPointBlock[1],
        topPointBlock[0] + size[0]!!, topPointBlock[1])
    //вер
    const l1 = new LineCanvas(topPointBlock[0], topPointBlock[1],
        topPointBlock[0], topPointBlock[1] + size[1]!!)
    //гор
    const l2 = new LineCanvas(topPointBlock[0], topPointBlock[1] + size[1]!!,
        topPointBlock[0] + size[0]!!, topPointBlock[1] + size[1]!!)
    //вер
    const l3 = new LineCanvas(topPointBlock[0] + size[0]!!, topPointBlock[1],
        topPointBlock[0] + size[0]!!, topPointBlock[1] + size[1]!!)

    return [l0, l1, l2, l3]
}


/**
 * Подсчитывает координаты для формы блока ромб
 * @param styleBlock
 * @param left
 * @param top
 */
export function getConditionShape(styleBlock: CSSProperties,
                                  left: number,
                                  top: number) {
    //размер блока
    let size = [convertStyleToReadableFormat(styleBlock.width),
        convertStyleToReadableFormat(styleBlock.height)]

    //вернхняя левая координата блока
    const topPointBlock: number[] = getCoorWithAllIndents(styleBlock, left, top)
    //расчет координат ромба
    const topVertex: number[] = [topPointBlock[0] + (size[0]!! / 2), topPointBlock[1]]
    const leftVertex: number[] = [topPointBlock[0], topPointBlock[1] + (size[1]!! / 2)]

    const l0 = new LineCanvas(topVertex[0], topVertex[1], leftVertex[0], leftVertex[1])
    const l1 = new LineCanvas(topVertex[0], topVertex[1], leftVertex[0] + size[0]!!, leftVertex[1])
    const l2 = new LineCanvas(topVertex[0], topVertex[1] + size[1]!!, leftVertex[0], leftVertex[1])
    const l3 = new LineCanvas(topVertex[0], topVertex[1] + size[1]!!, leftVertex[0] + size[0]!!, leftVertex[1])
    return [l0, l1, l2, l3]
}

export function getLoopShape(styleBlock: CSSProperties,
                             left: number,
                             top: number) {
    //размер блока
    let size = [convertStyleToReadableFormat(styleBlock.width),
        convertStyleToReadableFormat(styleBlock.height)]

    //вернхняя левая координата блока
    const topPointBlock: number[] = getCoorWithAllIndents(styleBlock, left, top)
    //расчет координат ромба
    const topVertex1: number[] = [topPointBlock[0] + (size[0]!! / 4), topPointBlock[1]]
    const topVertex2: number[] = [topPointBlock[0] + size[0]!! - (size[0]!! / 4), topPointBlock[1]]
    const leftVertex: number[] = [topPointBlock[0], topPointBlock[1] + (size[1]!! / 2)]

    const l0 = new LineCanvas(topVertex1[0], topVertex1[1], leftVertex[0], leftVertex[1])
    const l1 = new LineCanvas(topVertex1[0], topVertex1[1], topVertex2[0], topVertex2[1])
    const l2 = new LineCanvas(topVertex2[0], topVertex2[1], leftVertex[0] + size[0]!!, leftVertex[1])
    const l3 = new LineCanvas(topVertex1[0], topVertex1[1] + size[1]!!, leftVertex[0], leftVertex[1])
    const l4 = new LineCanvas(topVertex2[0], topVertex2[1] + size[1]!!, leftVertex[0] + size[0]!!, leftVertex[1])
    const l5 = new LineCanvas(topVertex1[0], topVertex1[1] + size[1]!!, topVertex2[0], topVertex2[1] + size[1]!!)
    return [l0, l1, l2, l3, l4, l5]

}

export function getInOutputShape(styleBlock: CSSProperties,
                                 left: number,
                                 top: number) {
    //размер блока
    let size = [convertStyleToReadableFormat(styleBlock.width),
        convertStyleToReadableFormat(styleBlock.height)]

    //вернхняя левая координата блока
    const topPointBlock: number[] = getCoorWithAllIndents(styleBlock, left, top)
    //расчет координат ромба
    const topVertex: number[] = [topPointBlock[0] + (size[0]!! / 4), topPointBlock[1]]
    const leftVertex: number[] = [topPointBlock[0], topPointBlock[1] + (size[1]!! / 2)]

    const l0 = new LineCanvas(topPointBlock[0] + 30, topPointBlock[1], topPointBlock[0] + size[0]!!, topPointBlock[1])
    const l1 = new LineCanvas(topPointBlock[0], topPointBlock[1] + size[1]!!, topPointBlock[0] + size[0]!! - 30, topPointBlock[1] + size[1]!!)
    const l2 = new LineCanvas(topPointBlock[0] + 30, topPointBlock[1], topPointBlock[0], topPointBlock[1] + size[1]!!)
    const l3 = new LineCanvas(topPointBlock[0] + size[0]!!, topPointBlock[1], topPointBlock[0] + size[0]!! - 30, topPointBlock[1] + size[1]!!)
    return [l0,
        l1,
        l2,
        l3
    ]

}

/**
 * Получить верхнюю координату блока
 * с margin и padding
 * @param style - стиль из которого извлекаются отступы
 */
function getCoorWithAllIndents(style: CSSProperties, left: number, top: number): number[] {

    let width = left
    let height = top

    const margin = convertStyleToReadableFormat(style.margin)
    const padding = convertStyleToReadableFormat(style.padding)

    if (margin !== undefined) {
        width += margin
        height += margin
    }

    if (padding !== undefined) {
        width += padding
        height += padding
    }

    return [width, height]
}