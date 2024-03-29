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



