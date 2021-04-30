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

    /**
     * функция, в которую передаются все входные параметры для расчета
     * @param idBlock - id блока, для которого происходит перерасчет. Если это только что созданный блок - равен null
     * @param typeBlock - тип блока. Может быть равен null, если блок не только что создан (ибо в таком случае тип не нужен)
     * @param parentId - предыдущий блок, относительно которого происходит расчет координат
     */
    public calcCoordinates(idBlock: string | null, typeBlock: string | null, parentId: string): number[] {
        let parent: number[] | null = null

        //если блок не первый
        if (parentId.localeCompare("-1")) {
            const prevBlock = getBlockById(parentId)!!
            parent = [prevBlock.getLeft(), prevBlock!.getTop()]
        }

        return this.calcDistanceBlocks(idBlock,typeBlock, parent)
    }

    /**
     * расчитать координаты для инициализирующего блока
     * @param sizeBlock - размер блока
     * @private
     */
    private blockMiddleEditor(sizeBlock: number[]): number[] {

        //итоговые координаты блока
        let left: number = 0
        let top: number = 0

        //высчитать координаты для отрисовки по середине панели
        left = this.width / 2 - (sizeBlock[0] / 2)
        top = this.height / 2 - (sizeBlock[1] / 2)
        return [left, top]
    }

    /**
     * расчитать коориданты для остальных блоков
     * @param sizeBlock - размер блока
     * @param parentCoor - координаты родительского блока
     * @private
     */
    private calcCoorOtherBlocks(sizeBlock: number[], parentCoor: number[]) {
        //итоговые координаты блока
        let left: number = parentCoor!![0]
        let top: number = parentCoor!![1] + sizeBlock[1] + MIN_BLOCKS_DISTANCE
        return [left, top]

    }

    /**
     * получить стиль блока по его типу (для случаев, когда блок только создается)
     * @param typeBlock - тип блока, для получения размеров, соответствующих данному типу
     * @private
     */
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


    /**
     * получить размеры блока через его стиль по идентификатору
     * @param idBlock - id блока, для получения уникальных размеров блока
     * @private
     */
    private getSizeBlockById(idBlock: string): number[] {
        let size: any[] = []
        const block = getBlockById(idBlock)

        const styleBlock = block?.getStyleBlock()
        size = [convertStyleToReadableFormat(styleBlock?.width),
            convertStyleToReadableFormat(styleBlock?.height)]

        return size
    }

    /**
     * расчитать координаты
     * @param idBlock - id блока, для которого нужны координаты
     * @param typeBlock - тип блока, для которого нужны координаты
     * @param parentCoor - координаты предыдущего блока
     */
    calcDistanceBlocks(idBlock: string | null, typeBlock: string | null, parentCoor: number[] | null): number[] {
        //получить размеры блока
        let sizeBlock: number[] | undefined

        if(idBlock === null)  sizeBlock = this.getSizeBlockByType(typeBlock!!)
        else sizeBlock = this.getSizeBlockById(idBlock!!)

        //если блок первый и не имеет родителей
        if (parentCoor === null)
            return this.blockMiddleEditor(sizeBlock)
        //если координаты блока высчитываются из координат окружающих блоков
        else return this.calcCoorOtherBlocks(sizeBlock, parentCoor);
    }
}
