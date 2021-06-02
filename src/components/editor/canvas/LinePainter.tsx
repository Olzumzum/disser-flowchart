import {LineCanvas} from "./LineCanvas";
import {contextCanvas} from "./CanvasPainter";

/**
 * Рисует массив линий на канве
 * @param ctx
 * @param lines - массив рисуемых линий
 */
export function drawLines(ctx: CanvasRenderingContext2D, lines: LineCanvas[], color: string){
    lines.forEach(item => {
        drawLine(ctx, item, color)
    })
}

/**
 * Нарисовать одну линию по координатам
 * @param ctx
 * @param line - объект, хранящий координаты одной линии
 */
export function drawLine(ctx: CanvasRenderingContext2D,
                         line: LineCanvas, color: string){


    if (ctx !== null && ctx !== undefined){
        // ctx.fillStyle = color
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(line.x,line.y);
        ctx.lineTo(line.x2, line.y2);

        ctx.stroke();
        ctx.fill()
    } else Error("нулевой контекст")

}



/**
 * Функция стирает массив линий на канве
 * @param ctx - контекст канвы, где отрисовывается блок
 * @param lines - массив стираемых линий
 */
export function clearLines(ctx: CanvasRenderingContext2D, lines: LineCanvas[]) {
    lines.forEach(item => {
        contextCanvas!!.clearRect(item.x, item.y,
            item.x2 + 1, item.y2)
    })
}