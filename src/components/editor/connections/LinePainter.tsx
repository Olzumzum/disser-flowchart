import {LinePartConnect} from "./LinePartConnect";

export function drawLine(ctx: CanvasRenderingContext2D,
                         x: number,
                         y: number,
                         width: number,
                         height: number): LinePartConnect {
    if (ctx !== null && ctx !== undefined){
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(x, y, width, height)
        ctx.fill()
    } else Error("нулевой контекст")

    return new LinePartConnect(x, y, width, height)
}