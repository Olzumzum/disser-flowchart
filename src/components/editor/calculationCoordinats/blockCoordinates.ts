import {getHeightEditPanel, getWidthEditPanel} from "./panelCalc";
import {getStyleBlock} from "../blocks/primitives/ParentBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {getStyleEditPanel} from "../panel/EditPanel";


export function calcCoordinates(type: string): number[] {
    return blockMiddleEditor(type)
}

function blockMiddleEditor(type: string): number[] {

    const styleEditPanel = getStyleEditPanel()
    const width= styleEditPanel.width
    const height = 0
        // styleEditPanel.height - styleEditPane
    console.log("coor panel " + width + " " + height)

    const sizeBlock = getStyleSizeOfTypeBlock(type)
    console.log("coor block" + sizeBlock[0] + " " + sizeBlock[1])

    // const left: number = width / 2 - (sizeBlock[0] / 2)
    // const top = height / 2 - (sizeBlock[1] / 2)
    //
    // console.log("coor " + left + " " + top)
    return []
}

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