import React, {FC, useEffect, useRef} from "react";

/**
 * Возврщает конекст канвас, где будут рисоваться связи
 */
export let contextCanvas: CanvasRenderingContext2D

/**
 * Рисует канву, на которой отображаются линии-связи между блоками
 * @param props
 * @constructor
 */
export const CanvasPainter: FC =
    props =>{
        const canvasRef = useRef<HTMLCanvasElement | null>(null);

        useEffect(() => {
            contextCanvas = canvasRef.current!!.getContext('2d')!!

        }, [])

        return (
            <canvas ref={canvasRef}{...props}/>
        )
    }
