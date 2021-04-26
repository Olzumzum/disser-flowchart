import {getStyleBlock} from "../blocks/primitives/ParentBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {getStyleEditPanel} from "../panel/EditPanel";

const MIN_BLOCKS_DISTANCE = 15;

export class CoordinateCalculator {
    //получить размер панели через ее стиль
    private styleEditPanel = getStyleEditPanel()
    private width = document.body.clientWidth
    private height = Number(this.styleEditPanel.height)
    private parent: number[] | null = null

    //функция, в которую передаются все входные параметры для расчета
    public calcCoordinates(type: string, isInit: boolean, parent: number[] | null): number[] {
        if (parent !== null) this.parent = parent
        return this.blockMiddleEditor(type, isInit)
    }


    blockMiddleEditor(type: string, isInit: boolean): number[] {

        //получить размеры блока
        const sizeBlock = this.getStyleSizeOfTypeBlock(type)
        //итоговые координаты блока
        let left: number = 0
        let top: number = 0

        if (isInit) {
            console.log(" true")
            //высчитать координаты для отрисовки по середине панели
            left = this.width / 2 - (sizeBlock[0] / 2)
            top = this.height / 2 - (sizeBlock[1] / 2)
        } else {
            console.log(" false")
            left = this.parent!![0]
            top = this.parent!![1] + sizeBlock[1] + MIN_BLOCKS_DISTANCE

        }

        console.log("cooor " + left + " " + top)
        return [left, top]
    }


    //получить размеры блока через его стиль
    getStyleSizeOfTypeBlock(type: string): number[] {
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

    calcDistanceBlocks(typeBlock: string) {

    }
}
