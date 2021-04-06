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
            ctx.fillRect(50,50, 3, 50)
            ctx.fill()
        }

        useEffect(() => {
            const canvas = canvasRef.current!!
            const contextC = canvas.getContext('2d')!!
            draw(contextC)
        }, [])


        return (
            <canvas ref={canvasRef}{...props}>

            </canvas>
        )
    }