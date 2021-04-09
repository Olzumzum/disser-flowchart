import {ConnectionBlocks} from "./ConnectionBlocks";

/** ШИРИНА РИСУЕМОЙ СВЯЗИ **/
const CONNECTION_WIDTH = 1;
/** ЦВЕТ РИСУЕМОЙ СВЯЗИ **/
const CONNECTION_COLOR = '#000000';

export const drawConnectionBlocks = (ctx: CanvasRenderingContext2D,
                                     x: number,
                                     y: number,
                                     width: number,
                                     height: number) => {
    const connect = new ConnectionBlocks(x, y, CONNECTION_WIDTH, height)

    ctx.fillStyle = CONNECTION_COLOR
    ctx.beginPath()
    ctx.fillRect(connect.x, connect.y, connect.width, connect.height)
    ctx.fill()
}