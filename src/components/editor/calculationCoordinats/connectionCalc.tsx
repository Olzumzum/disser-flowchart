import {IBlock} from "../blocks/primitives/IBlock";

export function scaleCoorConnection(itemOne: IBlock, itemTwo: IBlock): any[] | null {
    const element = document.getElementById(itemTwo.getId()!!)

    if (element != null) {
        //получить мэрджин блока
        const marg= parseInt(window.getComputedStyle(element, null).margin)
        //координаты верха блока
        let left = itemTwo.getLeft() + marg
        let top = itemTwo.getTop() + marg

        const heightBlock = parseInt(window.getComputedStyle(element, null).height)
        const widthBlock = parseInt(window.getComputedStyle(element, null).width)

        left = left + (widthBlock / 2)
        top = top + heightBlock



        return [left, top]
    } else return null
}