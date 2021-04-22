import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions/BlocksActionTypes";

import {
    COORDINATE_CHANGE_ERROR,
    DATA_INSERTION_ERROR,
    DATA_LOADING_ERROR,
    ERROR_ADDING_BLOCK
} from "../../assets/strings/errorMessadges";
import {IBlock} from "../../components/editor/blocks/primitives/IBlock";
import {checkCoorBlocksByFollow, paintConnection} from "../../components/editor/connections/ConnectionPainter";

const blocks = new Array<IBlock>()


/**
 * загрузить список всех оригинальных блоков, расположенных
 * на панели компонентов
 */
export const fetchOriginalBlocks = () => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
            const response = blocks
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
            })
            dispatch({
                type: BlocksActionTypes.FETCH_ORIGIN_BLOCKS_SUCCESS, payload: response
            })
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: DATA_LOADING_ERROR
            })
        }
    }
}

/**
 *
 * загрузить список всех добавленных на панель редактирования блоков
 *
 */
export const fetchBlocks = () => {
    console.log("Количество элементов " + blocks.length)
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
            // const response = originalBlocks
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

/**
 * добавление нового блока из панели компонентов
 * @param block
 */
export const addBlocks = (block: IBlock) => {
    console.log("Добавила " + blocks.length)
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            blocks.push(block)
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
            })
            dispatch({type: BlocksActionTypes.ADD_BLOCK, payload: block})
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS, payload: blocks})
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

//id блока с которым будет создаваться связь
let idItemTwo: string | undefined = undefined

/**
 * Проверить при перемещении блока, не пытается ли пользователь создать связь между блоками.
 * Проверка осуществляется сравнением координат - если площади блоков пересекаются - создать связь
 * и не перемещать блок
 * @param id перемещаемого блока
 * @param left - координата перемещаемого блока
 * @param top - координата перемещаемого блока
 */
export const checkCoordinatesBlock = (id: string, left: number, top: number) => {
    let flag = false

    blocks.forEach((item, i) => {

        if (!flag && item.getId()?.localeCompare(id)) {
            const blockWidth: number = document.getElementById(item.getId()!!)!!.clientWidth
            const blockTop: number = document.getElementById(item.getId()!!)!!.clientHeight

            if ((left >= item.getLeft() || (left + blockWidth) >= item.getLeft()) &&
                (left <= item.getLeft() + blockWidth) &&
                (top >= item.getTop() || (top + blockTop) >= item.getTop()) &&
                (top <= item.getTop() + blockTop)
            ) {
                idItemTwo = item.getId()
                flag = true

            }
        }
    })

    return flag
}


/**
 * Задать соседство блоков
 * @param idOne - блок, идущий первым
 * @param idTwo - следующий блок
 */
export const connectBlocksLink = (idOne: string) => {
    let itemOne: IBlock | undefined
    let itemTwo: IBlock | undefined


    itemOne = getBlockById(idOne)
    if (idItemTwo !== undefined) itemTwo = getBlockById(idItemTwo)
    else console.log("Обработать ошибку")

    if (itemOne !== undefined && itemTwo !== undefined) {
        //ЗДЕСЬ НУЖНО БУДЕТ УЧЕСТЬ ТИП БЛОКА
        // if(itemOne.getTypeBlock() == "БЛОК ВХОДА" && itemTwo.getTypeBlock() == "БЛОК ВХОДА") ОШИБКА
        // if(itemOne.getTypeBlock() == "БЛОК ВХОДА") СДЕЛАТЬ ЕГО ПЕРВЫМ
        // if(itemTwo.getTypeBlock() == "БЛОК ВХОДА") СДЕЛАТЬ ЕГО ПЕРВЫМ

        //установить соседство блоков
        setNeighbors(itemOne, itemTwo)
        checkCoorBlocksByFollow(itemOne, itemTwo)
        //нарисовать связь
        paintConnection(itemOne, itemTwo)
        return async (dispatch: Dispatch<BlocksAction>) => {
            dispatch({type: BlocksActionTypes.PUT_DATA, payload: blocks})
        }
    }

}

/**
 * Задать ссылки для двух элементов
 * @param itemOne
 * @param itemTwo
 */
const setNeighbors = (itemOne: IBlock, itemTwo: IBlock) => {
    itemOne.setSubsequentNeighbor(itemTwo.getId()!!)
    itemTwo.setPreviousNeighbor(itemOne.getId()!!)
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
