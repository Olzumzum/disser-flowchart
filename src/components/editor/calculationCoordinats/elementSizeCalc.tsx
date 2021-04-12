
/**
 * Возвращает ширину компонента
 * @param id - идентификатор элемента в HTML
 */
export function getWidthElement(id: string): number | null {
    const element = document.getElementById(id)
    if (element != null) {
        return Number(element.offsetWidth)
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
        return Number(element.clientHeight)
    } else
        return null

}