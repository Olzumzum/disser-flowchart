import {calcSizeBlockCanvas, convertStyleToReadableFormat} from "../../calculat_coordinates/elementSizeCalc";
import {clearLines, drawLine, drawLines} from "../../canvas/LinePainter";
import {LineCanvas} from "../../canvas/LineCanvas";
import {CSSProperties} from "react";
import {contextCanvas} from "../../canvas/CanvasPainter";

/**
 * Отрисовывает форму блока в нужном месте,
 * стирает предыдущую отрисовку
 * @param ctx - контекст канвы, где отрисовывается блок
 * @param blockShape - массив линий формы блока
 */
export function drawBlockShape(ctx: CanvasRenderingContext2D,
                               blockShape: LineCanvas[],
                               styleBlock: CSSProperties,
                               left: number,
                               top: number
): LineCanvas[] {

    clearLines(ctx, blockShape)

    blockShape = getBlockShape(contextCanvas!!, styleBlock, left, top)
    drawLines(ctx, blockShape)
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
export function getBlockShape(ctx: CanvasRenderingContext2D,

                              styleBlock: CSSProperties,
                              left: number,
                              top: number){

    const l0 = getLineFormBlock(ctx, left!!, top!!, true, styleBlock)

    const l1 = getLineFormBlock(ctx, left!!, top!!
        + convertStyleToReadableFormat(styleBlock.height)!!, true, styleBlock)

    const l2 = getLineFormBlock(ctx, left!!, top!!, false, styleBlock)

    const l3 = getLineFormBlock(ctx,
        left!! + convertStyleToReadableFormat(styleBlock.width)!! , top!!, false, styleBlock)

    return [l0, l1, l2, l3]
}

export function getConditionShape(ctx: CanvasRenderingContext2D,

                                  styleBlock: CSSProperties,
                                  left: number,
                                  top: number){

    const l0 = getLineFormBlock(ctx, left!!, top!!, true, styleBlock)

    const l1 = getLineFormBlock(ctx, left!!, top!!
        + convertStyleToReadableFormat(styleBlock.height)!!, true, styleBlock)

    const l2 = getLineFormBlock(ctx, left!!, top!!, false, styleBlock)

    const l3 = getLineFormBlock(ctx,
        left!! + convertStyleToReadableFormat(styleBlock.width)!! , top!!, false, styleBlock)

    return [l0, l1, l2, l3]
}



/**
 * Создает линию для отображения блока с учетом всех стилистических особенностей
 * @param ctx
 * @param left
 * @param top
 * @param isHorizontal
 */
export function getLineFormBlock(ctx: CanvasRenderingContext2D,
                                 left: number,
                                 top: number,
                                 isHorizontal: boolean,
                                 styleBlock: CSSProperties
): LineCanvas{

    let size = calcSizeBlockCanvas(styleBlock, left, top, isHorizontal)!!

    return new LineCanvas(size[0], size[1], size[2], size[3])
}