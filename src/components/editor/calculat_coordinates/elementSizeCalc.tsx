/**
 * Возвращает ширину компонента
 * @param id - идентификатор элемента в HTML
 */
import {CSSProperties} from "react";

export function getWidthElement(id: string): number | null {
    const element = document.getElementById(id)
    if (element != null) {
        return Number(element.clientWidth)

    } else
        return null
}

/**
 * Возвращает высоту компонента
 * @param id - идентификатор элемента в HTML
 */
export function getHeightElement(id: string): number | null {
    const element = document.getElementById(id)
    if (element != null) {
        return (Number(element.clientHeight)
            - parseInt(window.getComputedStyle(element, null).padding))
    } else
        return null
}

/**
 * преобразование CSS-свойства в числовой формат
 * @param proper
 */
export function convertStyleToReadableFormat(proper: undefined | string | symbol | number): number | undefined {
    if ((proper) !== undefined) {
        if (typeof proper === "string") return parseInt(proper)
        else if (typeof proper === "symbol") return Number(proper)
        else {
            return proper
        }
    }
    return undefined
}

const LINE_WIDTH_BLOCK_SHAPE = 2

export function calcSizeBlockCanvas(
    style: CSSProperties,
    _left: number,
    _top: number,
    isHorizontal: boolean
): number[] | undefined {

    const left = _left + convertStyleToReadableFormat(style.padding)!!
        + convertStyleToReadableFormat(style.margin)!!

    const top = _top + convertStyleToReadableFormat(style.padding)!!
        + convertStyleToReadableFormat(style.margin)!!

    let width: number
    let height: number
    if (isHorizontal) {
        width = convertStyleToReadableFormat(style.width)!!
        height = LINE_WIDTH_BLOCK_SHAPE
    } else {
        // console.log("Добрый вечер")
        width = LINE_WIDTH_BLOCK_SHAPE
        height = convertStyleToReadableFormat(style.height)!!
    }

    return [left, top, width, height]
}