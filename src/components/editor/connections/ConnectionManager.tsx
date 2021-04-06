import React, {FC, useEffect, useRef} from "react";

interface ConnectionManagerProperties {
    // width: number,
    // height: number,
    // colorBar: string,
    // animationSpeed: number,
    // staggerDelay: number,
    // padding: number,
    // rotation: number,
    // data: number[]
}

export const ConnectionManager: FC<ConnectionManagerProperties> =
    props => {

        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        const draw = (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = '#000000'
            ctx.beginPath()
            ctx.arc(50, 100, 20, 0, 2 * Math.PI)
            ctx.fill()
        }

        useEffect(() => {
            const canvas = canvasRef.current!!
            const contextC = canvas.getContext('2d')!!
            contextC.fillStyle = '#000000'
            contextC.fillRect(0, 0, contextC.canvas.width, contextC.canvas.height)
        }, [])


        return (
            <canvas ref={canvasRef}{...props}>

            </canvas>
        )
    }