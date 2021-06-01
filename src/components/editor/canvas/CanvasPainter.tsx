import React, {CSSProperties, FC, useEffect, useRef} from "react";
import {
    getHeightEditPanel,
    getWidthEditPanel
} from "../calculat_coordinates/panelCalc";

/**
 * Возврщает конекст канвас, где будут рисоваться связи
 */
export let contextCanvas: CanvasRenderingContext2D | null

const canvasStyle: CSSProperties = {
    backgroundColor: "#fff",
    zIndex: 30,
}

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

            contextCanvas.canvas.width = getWidthEditPanel()!! * 4
            contextCanvas.canvas.height = getHeightEditPanel()!! * 4
        }, [])

        return (
            <canvas ref={canvasRef}{...props} style={canvasStyle}/>
        )
    }

/**
 * Гениальная функция по увеличению канвы
 */
export function redrewCanvas(){
    contextCanvas!!.canvas.width = contextCanvas!!.canvas.width + 100
    contextCanvas!!.canvas.height = contextCanvas!!.canvas.height + 1000
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

