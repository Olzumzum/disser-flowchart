import {getStyleEditPanel} from "../panel/EditPanel";
import {getBlockById} from "../../../store/action-creators/blocks";
import {convertStyleToReadableFormat} from "./elementSizeCalc";
import {getStyleParentBlock, ParentBlock} from "../blocks/primitives/ParentBlock";
import {CSSProperties} from "react";
import {BlockTypes} from "../blocks/primitives/BlockTypes";

const MIN_BLOCKS_DISTANCE = 15;

export class CoordinateCalculator {
    //получить размер панели через ее стиль
    private styleEditPanel = getStyleEditPanel()
    //ширина всей панели
    private width = document.body.clientWidth
    //высота всей панели
    private height = Number(this.styleEditPanel.height)

    //функция, в которую передаются все входные параметры для расчета
    public calcCoordinates(idBlock: string | null, typeBlock: string | null, parentId: string): number[] {
        let parent: number[] | null = null

        //если блок не первый
        if (parentId.localeCompare("-1")) {
            const prevBlock = getBlockById(parentId)!!
            parent = [prevBlock.getLeft(), prevBlock!.getTop()]
        }

        return this.calcDistanceBlocks(idBlock,typeBlock, parent)
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

    //получить стиль блока по его типу (для случаев, когда блок только создается)
    private getSizeBlockByType(typeBlock: string): number[]     {
        let size: any[]
        let styleBlock: CSSProperties | undefined

        switch (typeBlock){
            case BlockTypes.BLOCK:
                 styleBlock = getStyleParentBlock()
        }

        size = [convertStyleToReadableFormat(styleBlock?.width),
            convertStyleToReadableFormat(styleBlock?.height)]

        return size
    }


    //получить размеры блока через его стиль по идентификатору
    private getSizeBlockById(idBlock: string): number[] {
        let size: any[] = []
        const block = getBlockById(idBlock)

        const styleBlock = block?.getStyleBlock()
        size = [convertStyleToReadableFormat(styleBlock?.width),
            convertStyleToReadableFormat(styleBlock?.height)]

        return size
    }

    //расчитать координаты
    calcDistanceBlocks(idBlock: string | null, typeBlock: string | null, parent: number[] | null): number[] {
        //получить размеры блока
        let sizeBlock: number[] | undefined

        if(idBlock === null)  sizeBlock = this.getSizeBlockByType(typeBlock!!)
        else sizeBlock = this.getSizeBlockById(idBlock!!)

        console.log("sizeBlock " + sizeBlock[0] + " " + sizeBlock[1])
        //если блок первый и не имеет родителей
        if (parent === null)
            return this.blockMiddleEditor(sizeBlock)
        //если координаты блока высчитываются из координат окружающих блоков
        else return this.calcCoorOtherBlocks(sizeBlock, parent);
    }
}
