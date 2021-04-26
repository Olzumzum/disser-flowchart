import {getStyleBlock} from "../blocks/primitives/ParentBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {getStyleEditPanel} from "../panel/EditPanel";

const MIN_BLOCKS_DISTANCE = 10;

export function calcCoordinates(type: string, isInit: boolean): number[] {
    return blockMiddleEditor(type, isInit)
}

function blockMiddleEditor(type: string, isInit: boolean): number[] {
    //получить размер панели через ее стиль
    const styleEditPanel = getStyleEditPanel()
    const width = document.body.clientWidth
    const height = Number(styleEditPanel.height)

    //получить размеры блока
    const sizeBlock = getStyleSizeOfTypeBlock(type)
    //итоговые координаты блока
    let left: number = 0
    let top: number = 0

    if (isInit) {
        //высчитать координаты для отрисовки по середине панели
        left = width / 2 - (sizeBlock[0] / 2)
        top = height / 2 - (sizeBlock[1] / 2)
    } else {

        left = width / 2 - (sizeBlock[0] / 2)
        top = height / 2 - (sizeBlock[1] / 2)
    }
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