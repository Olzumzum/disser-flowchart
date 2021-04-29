import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {getStyleEditPanel} from "../panel/EditPanel";
import {getBlockById} from "../../../store/action-creators/blocks";

const MIN_BLOCKS_DISTANCE = 15;

export class CoordinateCalculator {
    //получить размер панели через ее стиль
    private styleEditPanel = getStyleEditPanel()
    private width = document.body.clientWidth
    private height = Number(this.styleEditPanel.height)

    //функция, в которую передаются все входные параметры для расчета
    public calcCoordinates(idBlock: string, parentId: string): number[] {
        let parent: number[] | null = null

        if (parentId.localeCompare("-1")) {
            const prevBlock = getBlockById(parentId)!!
            parent = [prevBlock.getLeft(), prevBlock!.getTop()]
        }

        return this.calcDistanceBlocks(idBlock, parent)
    }

    //расчитать координаты для инициализирующего блока
    private blockMiddleEditor(sizeBlock: number[]): number[] {

        //итоговые координаты блока
        let left: number = 0
        let top: number = 0

        //высчитать координаты для отрисовки по середине панели
        left = this.width / 2 - (sizeBlock[0] / 2)
        top = this.height / 2 - (sizeBlock[1] / 2)
        return [left, top]
    }

    //расчитать коориданты для остальных блоков
    private calcCoorOtherBlocks(sizeBlock: number[], parent: number[]) {
        //итоговые координаты блока
        let left: number = parent!![0]
        let top: number = parent!![1] + sizeBlock[1] + MIN_BLOCKS_DISTANCE
        return [left, top]

    }


    //получить размеры блока через его стиль
    private getStyleSizeOfTypeBlock(idBlock: string): number[] {
        let size: any[] = []
        const block = getBlockById(idBlock)
        const styleBlock = block?.getStyleBlock()
        size = [styleBlock?.width, styleBlock?.height]


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

    //расчитать координаты
    calcDistanceBlocks(idBlock: string, parent: number[] | null): number[] {
        //получить размеры блока
        const sizeBlock = this.getStyleSizeOfTypeBlock(idBlock)

        //если блок первый и не имеет родителей
        if (parent === null)
            return this.blockMiddleEditor(sizeBlock)
        //если координаты блока высчитываются из координат окружающих блоков
        else return this.calcCoorOtherBlocks(sizeBlock, parent);
    }
}
