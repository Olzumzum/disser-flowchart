import React, {FC, useEffect, useRef} from "react";
import {
    getHeightCanvas,
    getHeightEditPanel,
    getWidthCanvas,
    getWidthEditPanel
} from "../calculationCoordinats/panelCalc";

/**
 * Возврщает конекст канвас, где будут рисоваться связи
 */
export let contextCanvas: CanvasRenderingContext2D | null

/**
 * Рисует канву, на которой отображаются линии-связи между блоками
 * @param props
 * @constructor
 */
export const CanvasPainter: FC =
    props => {

        const canvasRef = useRef<HTMLCanvasElement | null>(null);


        useEffect(() => {
            contextCanvas = canvasRef.current!!.getContext('2d')!!

            contextCanvas.canvas.width = getWidthCanvas()!!
            contextCanvas.canvas.height = getHeightCanvas()!!
        }, [])

        return (
            <canvas ref={canvasRef}{...props} style={{backgroundColor: "yellow"}}/>
        )
    }


/**
 * Очистить канву
 * @param context - контекст канвы, с которой необходимо произвести
 * действие
 */
function clearCanvas(context: CanvasRenderingContext2D) {
    if (context !== null) {
        const width = getWidthEditPanel()
        const height = getHeightEditPanel()

        if (width !== null && height !== null)
            context.clearRect(0, 0, width, height)
    }
}