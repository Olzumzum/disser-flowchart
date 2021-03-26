import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions";
import {IBlockFactory} from "../../editor/blocks/factory/IBlockFactory";
import {CreatorBlock} from "../../editor/blocks/factory/CreatorBlock";
import {
    COORDINATE_CHANGE_ERROR,
    DATA_INSERTION_ERROR,
    DATA_LOADING_ERROR,
    ERROR_ADDING_BLOCK
} from "../../assets/errorMessadges";
import {IBlock} from "../../editor/blocks/primitives/IBlock";

const creatorBlocks: IBlockFactory = new CreatorBlock()
const originalBlocks = creatorBlocks.getOriginBlock()
const blocks = new Array<IBlock>()

/**
 * загрузить список всех оригинальных блоков, расположенных
 * на панели компонентов
 */
export const fetchOriginalBlocks = () => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
            const response = originalBlocks
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
 * загрузить список всех добавленных на панель редактирования блоков
 *
 */
export const fetchBlocks = () => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
            // const response = originalBlocks
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
    return (dispatch: Dispatch<BlocksAction>) => {
        try {
            const response = blocks
            response.push(block)
            dispatch({type: BlocksActionTypes.ADD_BLOCK, payload: block})
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
export const changeBlocks = (id: string, left: number, top: number) => {
    let flag = false
    blocks.forEach(item => {
        if (!item.getId()?.localeCompare(id)) {
            item.setTop(top)
            item.setLeft(left)
            flag = true
        }
    })


    return (dispatch: Dispatch<BlocksAction>) => {
        try {
            if (flag) {
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