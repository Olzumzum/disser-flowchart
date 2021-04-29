/**
 * Возвращает ширину компонента
 * @param id - идентификатор элемента в HTML
 */
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
export function convertStyleToReadableFormat(proper: undefined | string | symbol | number): number | undefined{
    if ((proper) !== undefined) {
        if (typeof proper === "string") return parseInt(proper)
        else if (typeof proper === "symbol") return Number(proper)
        else {
            return proper
        }
    }
    return undefined
}