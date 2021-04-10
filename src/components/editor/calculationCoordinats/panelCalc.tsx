import {getHeightElement, getWidthElement} from "./elementSizeCalc";
/**
 * изменить координаты left в зависимости от ширины
 * панели компонентов (панель с original Blocks)
 */
export function getWidthComponentPanel(): number | null {
    return getWidthElement("component_panel")
}

export function getWidthEditPanel(): number | null {
    return getWidthElement("edit_panel")
}

export function getHeightEditPanel(): number | null {
    return getHeightElement("edit_panel")
}

