import {getHeightElement, getWidthElement} from "./elementSizeCalc";

/**
 * Получить ширину панели редактироваания
 */
export function getWidthEditPanel(): number | null {
    return getWidthElement("edit_panel")
}

/**
 * Получить высоту панели компонентов
 */
export function getHeightEditPanel(): number | null {
    return getHeightElement("edit_panel")
}

export function getWidthCanvas() : number | null {
    const element = document.getElementById("edit_panel")
    return (getWidthEditPanel()!! - parseInt(window.getComputedStyle(element!!, null).padding))
}
export function getHeightCanvas(): number | null {
    const element = document.getElementById("edit_panel")
    return (getHeightEditPanel()!! - parseInt(window.getComputedStyle(element!!, null).padding))
}

