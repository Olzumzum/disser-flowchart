/**
 * изменить координаты left в зависимости от ширины
 * панели компонентов (панель с original Blocks)
 */
export function getWidthComponentPanel(): number | null {
    return getWidthPanel("component_panel")
}

export function getWidthEditPanel(): number | null {
    return getWidthPanel("edit_panel")
}

export function getHeightEditPanel(): number | null {
    return getHeightPanel("edit_panel")
}

/**
 * Возвращает ширину компонента
 * @param id - идентификатор элемента в HTML
 */
function getWidthPanel(id: string): number | null {
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
function getHeightPanel(id: string): number | null {
    const element = document.getElementById(id)
    if (element != null) {
        return Number(element.offsetHeight)
    } else
        return null

}

export function leftCoorCanvas(y: number): number{
    const left = y - 120
    return left
}
