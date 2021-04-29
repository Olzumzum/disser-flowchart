
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