import React, {FC, useEffect, useRef} from "react";
import {getHeightEditPanel, getWidthEditPanel} from "../calculationCoordinats/calculetionCoordinats";

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
    props => {

        const canvasRef = useRef<HTMLCanvasElement | null>(null);


        useEffect(() => {
            contextCanvas = canvasRef.current!!.getContext('2d')!!

            contextCanvas.canvas.width = getWidthEditPanel()!!
            contextCanvas.canvas.height = getHeightEditPanel()!!
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