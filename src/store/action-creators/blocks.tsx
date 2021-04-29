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
import {paintConnection} from "../../components/editor/connections/ConnectionPainter";

const blocks = new Array<IBlock>()

/**
 *
 * загрузить список всех добавленных на панель редактирования блоков
 *
 */
export const fetchBlocks = () => {
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


export const linkMaker = (currentBlockId: string,
                          parentBlockId: string,) => {


    // if (currentBlockId === undefined || currentBlockId.localeCompare("")) return Error
    // if (parentBlockId === null || undefined) return Error
    console.log("лИНКМЕЙК")
    const currentBlock: IBlock | undefined = getBlockById(currentBlockId)
    currentBlock?.setParentId(parentBlockId)
    let parentBlock: IBlock | undefined

    //если блок самый первый
    if (parentBlockId.localeCompare("-1")) {

        parentBlock = getBlockById(parentBlockId)

        currentBlock?.setParentId(parentBlockId)
        parentBlock?.setNeighborId(currentBlockId)
    }

    blocks.forEach(item => {
        if (!item.getId().localeCompare(currentBlockId)){
         item = currentBlock!!
        }
        if (!item.getId().localeCompare(parentBlockId)){
            item = parentBlock!!
        }
    })
    paintConnection(currentBlock!!, parentBlock!!)

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
