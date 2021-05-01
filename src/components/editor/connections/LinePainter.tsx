import {LinePartConnect} from "./LinePartConnect";

export function drawLine(ctx: CanvasRenderingContext2D,
                         line: LinePartConnect){
    if (ctx !== null && ctx !== undefined){
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(line.x, line.y, line.width, line.height)
        ctx.fill()
    } else Error("нулевой контекст")

}