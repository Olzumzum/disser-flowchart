import {FC, useEffect, useRef} from "react";

interface ConnectionBlockProps {
    x: number,
    y: number,
}

export const ConnectionBlocks = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.fillRect(x, x, 3, 50)
    ctx.fill()
}