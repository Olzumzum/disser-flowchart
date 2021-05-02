import {calcSizeBlockCanvas, convertStyleToReadableFormat} from "../../calculat_coordinates/elementSizeCalc";
import {drawLine} from "../../connections/LinePainter";
import {LinePartConnect} from "../../connections/LinePartConnect";
import {CSSProperties} from "react";

/**
 * Нарисовать блок из лирний
 * @param ctx
 */
export function getCanvasObject(ctx: CanvasRenderingContext2D,
                                blockShape: LinePartConnect[],
                                styleBlock: CSSProperties,
                                left: number,
                                top: number
): void {
    if (blockShape?.length !== 0 && blockShape !== undefined) clearBlockCanv(ctx, blockShape)

const l0 = getLineFormBlock(ctx, left!!, top!!, true, styleBlock)
const l1 = getLineFormBlock(ctx, left!!, top!!, false, styleBlock)

const l2 = getLineFormBlock(ctx, left!!, top!! - 1
    + convertStyleToReadableFormat(styleBlock.height)!!, true, styleBlock)

const l3 = getLineFormBlock(ctx,
    left!! + convertStyleToReadableFormat(styleBlock.width)!! -1, top!!, false, styleBlock)

    blockShape = [l0, l1, l2, l3]
    blockShape.forEach(item => {
    drawLine(ctx, item)
})
}

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