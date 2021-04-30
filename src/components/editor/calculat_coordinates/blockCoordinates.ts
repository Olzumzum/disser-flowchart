import {getStyleEditPanel} from "../panel/EditPanel";
import {getBlockById, searchBlockBeUpdate} from "../../../store/action-creators/blocks";
import {convertStyleToReadableFormat} from "./elementSizeCalc";
import {getStyleParentBlock} from "../blocks/primitives/ParentBlock";
import {CSSProperties} from "react";
import {BlockTypes} from "../blocks/primitives/BlockTypes";

const MIN_BLOCKS_DISTANCE = 15;

/**
 * функция, в которую передаются все входные параметры для расчета
 * @param idBlock - id блока, для которого происходит перерасчет. Если это только что созданный блок - равен null
 * @param typeBlock - тип блока. Может быть равен null, если блок не только что создан (ибо в таком случае тип не нужен)
 * @param parentId - предыдущий блок, относительно которого происходит расчет координат
 */
export function calcCoordinates(idBlock: string | null, typeBlock: string | null, parentId: string): number[] {
    let parent: number[] | null = null

    //если блок не первый
    if (parentId.localeCompare("-1")) {
        const prevBlock = getBlockById(parentId)!!
        parent = [prevBlock.getLeft(), prevBlock!.getTop()]
    }

    return calcDistanceBlocks(idBlock, typeBlock, parent)
}

/**
 * расчитать координаты для инициализирующего блока
 * @param sizeBlock - размер блока
 * @private
 */
function blockMiddleEditor(sizeBlock: number[]): number[] {
//получить размер панели через ее стиль
    const styleEditPanel = getStyleEditPanel()
    //ширина всей панели
    const width = document.body.clientWidth
    //высота всей панели
    const height = Number(styleEditPanel.height)

    //итоговые координаты блока
    let left: number = 0
    let top: number = 0

    //высчитать координаты для отрисовки по середине панели
    left = width / 2 - (sizeBlock[0] / 2)
    top = height / 2 - (sizeBlock[1] / 2)
    return [left, top]
}

/**
 * расчитать коориданты для остальных блоков
 * @param sizeBlock - размер блока
 * @param parentCoor - координаты родительского блока
 * @private
 */
function calcCoorOtherBlocks(sizeBlock: number[], parentCoor: number[]) {
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
function getSizeBlockByType(typeBlock: string): number[] {
    let size: any[]
    let styleBlock: CSSProperties | undefined

    switch (typeBlock) {
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
function getSizeBlockById(idBlock: string): number[] {
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
function calcDistanceBlocks(idBlock: string | null, typeBlock: string | null, parentCoor: number[] | null): number[] {
    //получить размеры блока
    let sizeBlock: number[] | undefined

    if (idBlock === null) sizeBlock = getSizeBlockByType(typeBlock!!)
    else sizeBlock = getSizeBlockById(idBlock!!)

    //если блок первый и не имеет родителей
    if (parentCoor === null)
        return blockMiddleEditor(sizeBlock)
    //если координаты блока высчитываются из координат окружающих блоков
    else return calcCoorOtherBlocks(sizeBlock, parentCoor);
}

/**
 * перерасчет координат при изменениях
 * @param idChangedBlock - id блока, который был изменен
 */
export function recalculationCoorByEvent(idChangedBlock: string) {

    let changedBlock = getBlockById(idChangedBlock)
    while (changedBlock?.getNeighborId().localeCompare("-1")) {
        const idNeighbor = changedBlock?.getNeighborId()
        //подсчет новых координат соседа
        const newCoor = calcCoordinates(idNeighbor, null, changedBlock?.getId())

        //получение экземпляра соседа и обновление координат
        const neighborChangedBlock = getBlockById(idNeighbor)
        neighborChangedBlock?.setLeft(newCoor[0])
        neighborChangedBlock?.setTop(newCoor[1])

        //обновление блока
        searchBlockBeUpdate(neighborChangedBlock!!)

        changedBlock = neighborChangedBlock

    }
}

