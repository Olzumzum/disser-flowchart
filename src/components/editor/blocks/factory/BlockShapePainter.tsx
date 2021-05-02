import {calcSizeBlockCanvas, convertStyleToReadableFormat} from "../../calculat_coordinates/elementSizeCalc";
import {drawLine} from "../../connections/LinePainter";
import {LinePartConnect} from "../../connections/LinePartConnect";
import {CSSProperties} from "react";
import {contextCanvas} from "../../connections/CanvasPainter";

/**
 * Отрисовывает форму блока в нужном месте,
 * стирает предыдущую отрисовку
 * @param ctx - контекст канвы, где отрисовывается блок
 * @param blockShape - массив линий формы блока
 */
export function drawBlockShape(ctx: CanvasRenderingContext2D,
                               blockShape: LinePartConnect[],
                               styleBlock: CSSProperties,
                               left: number,
                               top: number
): LinePartConnect[] {
    // console.log("state blocks " + blockShape.length)
    clearBlockCanv(ctx, blockShape)

    blockShape = getBlockShape(contextCanvas!!, styleBlock, left, top)
    blockShape.forEach(item => {
    drawLine(ctx, item)
})
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
    const l1 = getLineFormBlock(ctx, left!!, top!!, false, styleBlock)

    const l2 = getLineFormBlock(ctx, left!!, top!! - 1
        + convertStyleToReadableFormat(styleBlock.height)!!, true, styleBlock)

    const l3 = getLineFormBlock(ctx,
        left!! + convertStyleToReadableFormat(styleBlock.width)!! -1, top!!, false, styleBlock)

    return [l0, l1, l2, l3]
}

/**
 * Функция стирает массив линий на канве
 * @param ctx - контекст канвы, где отрисовывается блок
 * @param blockShape - массив стираемых линий
 */
export function clearBlockCanv(ctx: CanvasRenderingContext2D, blockShape: LinePartConnect[]) {
    blockShape.forEach(item => {
        ctx.clearRect(item.x, item.y,
            item.width, item.height)
    })

}
/**
 * Создает линию для отображения блока с учетом всех стилистических особенностей
 * @param ctx
 * @param left
 * @param top
 * @param isHorizontal
 */
export function getLineFormBlock(ctx: CanvasRenderingContext2D, left: number,
    top: number, isHorizontal: boolean, styleBlock: CSSProperties): LinePartConnect{
    let size = calcSizeBlockCanvas(styleBlock, left, top, isHorizontal)!!
    return new LinePartConnect(size[0], size[1], size[2], size[3])
}