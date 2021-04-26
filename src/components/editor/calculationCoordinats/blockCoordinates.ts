import {getStyleBlock} from "../blocks/primitives/ParentBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {getStyleEditPanel} from "../panel/EditPanel";


export function calcCoordinates(type: string): number[] {
    return blockMiddleEditor(type)
}

function blockMiddleEditor(type: string): number[] {
    //получить размер панели через ее стиль
    const styleEditPanel = getStyleEditPanel()
    const width = document.body.clientWidth
    const height = Number(styleEditPanel.height)

    //получить размеры блока
    const sizeBlock = getStyleSizeOfTypeBlock(type)

    //высчитать координаты для отрисовки по середине панели
    const left: number = width / 2 - (sizeBlock[0] / 2)
    const top = height / 2 - (sizeBlock[1] / 2)

    return [left, top]
}

//получить размеры блока через его стиль
function getStyleSizeOfTypeBlock(type: string): number[] {
    let size: any[] = []
    switch (type) {
        case BlockTypes.BLOCK:
            size = [getStyleBlock().width, getStyleBlock().height]
    }

    let i = 0
    size.forEach(item => {
        if ((item) !== undefined) {
            if (typeof item === "string") size[i] = parseInt(item)
            else if (typeof item === "symbol") size[i] = Number(item)

        }
        i++
    })

    return size
}