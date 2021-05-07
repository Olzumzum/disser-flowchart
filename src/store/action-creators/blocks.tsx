import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions/BlocksActionTypes";

import {
    COORDINATE_CHANGE_ERROR,
    DATA_INSERTION_ERROR,
    DATA_LOADING_ERROR,
    ERROR_ADDING_BLOCK,
    NOT_EXIST_BLOCK
} from "../../assets/strings/errorMessadges";
import {IBlock} from "../../components/editor/blocks/primitives/bocks/IBlock";
import {recalculationCoorByEvent} from "../../components/editor/calculat_coordinates/blockCoordinates";

import {ff} from "../../components/editor/connections/ConnectionPainter";
import {IConnect} from "../../components/editor/blocks/primitives/connects/IConnect";
import {Block} from "../../components/editor/blocks/primitives/bocks/Block";
import {ParentBlock} from "../../components/editor/blocks/primitives/bocks/ParentBlock";
import {BlockTypes} from "../../components/editor/blocks/primitives/bocks/BlockTypes";
import {CreatorBlock} from "../../components/editor/blocks/factory/CreatorBlock";

// const b1 = new ParentBlock("1", 150, 50, BlockTypes.BLOCK)
// const b2 = new ParentBlock("2", 150, 150, BlockTypes.BLOCK)
const creator = new CreatorBlock()
const b1 = creator.createBlock("b1", BlockTypes.BLOCK, 300, 150)!!
const b2 = creator.createBlock("b2", BlockTypes.BLOCK, 300, 290)!!
const b3 = creator.createBlock("b3", BlockTypes.BLOCK, 100, 430)!!
const b4 = creator.createBlock("b4", BlockTypes.BLOCK, 350, 430)!!
const b5 = creator.createBlock("b5", BlockTypes.BLOCK, 350 , 570)!!

const b6 = creator.createBlock("b6", BlockTypes.BLOCK, 350 , 710)!!
const b7 = creator.createBlock("b7", BlockTypes.BLOCK, 100 , 570)!!
const b8 = creator.createBlock("b8", BlockTypes.BLOCK, 100 , 710)!!

b1.setInnerLevel(0)
b2.setParentId(b1.getId())
b2.setInnerLevel(0)

b3.setParentId(b2.getId())
b3.setInnerLevel(1)
b4.setParentId(b2.getId())
b4.setInnerLevel(1)

b5.setParentId(b4.getId())
b5.setInnerLevel(2)

b6.setParentId(b5.getId())
b6.setInnerLevel(3)
b7.setParentId(b3.getId())
b7.setInnerLevel(2)
b8.setParentId(b7.getId())
b8.setInnerLevel(3)
const blocks = new Array<IBlock>(b1, b2, b3, b4, b5, b6,b7,b8)
// const blocks = new Array<IBlock>()
const connects = new Array<IConnect>()

export function getConnects() {
    return connects
}

export function getBlock() {
    // const b1 = new Block("b1", 150, 150)
    // const b2 = new Block("b2", 150, 200)
    // const b3 = new Block("b3", 100, 240)
    // const b4 = new Block("b4", 100, 290)
    // const b5 = new Block("b5", 150 , 340)
    //
    // blocks.push(b1)
    return blocks
}

/**
 *
 * загрузить список всех добавленных на панель редактирования блоков
 *
 */
export const fetchBlocks = () => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            // dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
            // dispatch({
            //     type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
            // })

            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS, payload: blocks
            })
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: DATA_LOADING_ERROR
            })
        }
    }
}

/**
 * добавление нового блока из панели компонентов
 * @param block
 */
export const addBlocks = (block: IBlock, idParent: string) => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            blocks.push(block)

            dispatch({type: BlocksActionTypes.ADD_BLOCK, payload: block})

            //установить соседей
            settingUpNeighborhood(idParent, block.getId())
            //прерасчитать координаты
            // recalculationCoorByEvent(block.getId())
            // ff(idParent, block.getId())
            console.log("Связей " + connects.length)
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: ERROR_ADDING_BLOCK
            })
        }
    }
}


/**
 * изменение координат блока с указанным id
 * @param id изменяемого блока
 * @param left значение, на которое изменится координата left
 * @param top значение, на которое изменится координата top
 */
export const changingBlockCoor = (id: string, left: number, top: number) => {
    let flag = false

    const item = getBlockById(id)
    if (item !== undefined) {
        if (left !== -1) item.setLeft(left)
        if (top !== -1) item.setTop(top)
        flag = true
    }

    searchBlockBeUpdate(item!!)
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            if (flag) {
                dispatch({
                    type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
                })
                dispatch({type: BlocksActionTypes.PUT_DATA, payload: blocks})
            } else {
                dispatch({
                    type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                    payload: DATA_INSERTION_ERROR + " " + COORDINATE_CHANGE_ERROR
                })
            }
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                payload: DATA_INSERTION_ERROR + " " + COORDINATE_CHANGE_ERROR
            })
        }
    }
}


export function loadBlockById(id: string) {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            const block = getBlockById(id)
            if (block === undefined)
                dispatch({
                    type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                    payload: DATA_LOADING_ERROR + NOT_EXIST_BLOCK + id
                })
            else
                dispatch({
                    type: BlocksActionTypes.GET_BLOCK,
                    payload: block
                })
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                payload: DATA_LOADING_ERROR
            })
        }
    }
}


/**
 * Поиска блока по идентификатору
 * @param id
 */
export function getBlockById(id: string): IBlock | undefined {
    let block: IBlock | undefined = undefined

    blocks.forEach(item => {
        if (!item.getId().localeCompare(id))
            block = item

    })
    return block
}

/**
 * Задать соседство блоков
 * @param idParentBlock
 * @param idNewBlock
 */
export const settingUpNeighborhood = (idParentBlock: string, idNewBlock: string) => {

    //если родитель присутствует, мы задаем соседство
    //если родителя нет - его id = -1
    if (idParentBlock.localeCompare("-1")) {

        const parentBlock = getBlockById(idParentBlock)
        const newBlock = getBlockById(idNewBlock)
        const idPastNeighborBlock = parentBlock?.getNeighborId()
        //устанавливаем соседство между новым блоком и блоком, с которого вызывалось конекстное меню
        parentBlock?.setNeighborId(idNewBlock)
        newBlock?.setParentId(idParentBlock)

        //если у блока были соседи до этого
        if (idPastNeighborBlock !== undefined && idPastNeighborBlock.localeCompare("-1")) {

            const pastNeihborBlock = getBlockById(idPastNeighborBlock)
            newBlock?.setNeighborId(idPastNeighborBlock)
            pastNeihborBlock?.setParentId(idNewBlock)
            searchBlockBeUpdate(pastNeihborBlock!!)
        }

        searchBlockBeUpdate(newBlock!!)
        searchBlockBeUpdate(parentBlock!!)
    }
}

/**
 * поиск блока, который необходимо обновить и его обновление
 * @param updateBlock - обновляемый блок
 */
export const searchBlockBeUpdate = (updateBlock: IBlock) => {
    blocks.forEach(item => {
        if (!item.getId().localeCompare(updateBlock.getId())) {
            item = updateBlock
        }
    })

    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.UPDATE_BLOCKS})
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
            })
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS, payload: blocks
            })
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: DATA_LOADING_ERROR
            })
        }
    }
}