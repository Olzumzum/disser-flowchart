import React, {FC, useEffect, useRef} from "react";

/**
 * Возврщает конекст канвас, где будут рисоваться связи
 */
export let contextC: CanvasRenderingContext2D

/**
 * Рисует канву, на которой отображаются линии-связи между блоками
 * @param props
 * @constructor
 */
export const CanvasPainter: FC =
    props =>{
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
            const canvas = canvasRef.current!!
            contextC = canvas.getContext('2d')!!
            contextC.fillStyle = '#000000'
        }, [])


        return (
            <canvas ref={canvasRef}{...props}/>
        )
    }
