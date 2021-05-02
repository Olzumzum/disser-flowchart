import {LineCanvas} from "./LineCanvas";

/**
 * Рисует массив линий на канве
 * @param ctx
 * @param lines - массив рисуемых линий
 */
export function drawLines(ctx: CanvasRenderingContext2D, lines: LineCanvas[]){
    lines.forEach(item => {
        drawLine(ctx, item)
    })
}

/**
 * Нарисовать одну линию по координатам
 * @param ctx
 * @param line - объект, хранящий координаты одной линии
 */
export function drawLine(ctx: CanvasRenderingContext2D,
                         line: LineCanvas){
    if (ctx !== null && ctx !== undefined){
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(line.x, line.y, line.width, line.height)
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
        ctx.clearRect(item.x, item.y,
            item.width, item.height)
    })
}