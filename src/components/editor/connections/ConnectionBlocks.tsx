export const drawConnectionBlocks = (ctx: CanvasRenderingContext2D,
                                     x: number,
                                     y: number,
                                     width: number,
                                     height: number) => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.fillRect(x, y, width, height)
    ctx.fill()
}