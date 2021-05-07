import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {convertStyleToReadableFormat} from "../calculat_coordinates/elementSizeCalc";

export function calcCoorInnerLevelContainer(content: Array<IBlock>, parentId: string): number[] {
    let left = content[0].getLeft()
    let top = 0
    let width = 0
    let height = 0

    let rightBlock = content[0]
    let right = content[0].getLeft()
    let bottom: number = content[0].getTop()
    let bottomBlock = content[0]

    content.forEach(item => {
        if (!item.getParentId().localeCompare(parentId)) {
            top = item.getTop()
        }

        if (item.getLeft() < left) left = item.getLeft()
        //ищем самый правый блок
        if (item.getLeft() > right) {
            right = item.getLeft()
            rightBlock = item
        }
        //ищем самый нижний блок
        if (item.getTop() > bottom) {
            bottom = item.getTop()
            bottomBlock = item
        }
    })

    width = convertStyleToReadableFormat(rightBlock.getStyleBlock().width)!!
        + (rightBlock.getLeft() - left)
    height = convertStyleToReadableFormat(bottomBlock.getStyleBlock().height)!! + (bottomBlock.getTop() - top)
    const margin = convertStyleToReadableFormat(rightBlock.getStyleBlock().margin)!!

    if (margin !== undefined) {
        width += margin * 2
        height += margin * 2
    }

    return [left, top, width, height]
}