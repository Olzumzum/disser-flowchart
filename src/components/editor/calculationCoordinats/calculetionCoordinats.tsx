/**
 * изменить координаты left в зависимости от ширины
 * панели компонентов (панель с original Blocks)
 */
export function getWidthComponentPanel(): number | null {
    const element = document.getElementById("component_panel")
    if (element != null) {
        return Number(element.offsetWidth)
    } else
        return null
}