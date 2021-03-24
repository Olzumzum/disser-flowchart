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
                console.log("тут")
                dispatch({type: BlocksActionTypes.PUT_DATA})
                blocks.forEach(item => {
                    console.log("data " + item.getLeft() + " " + item.getTop())
                })
                dispatch({type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS, payload: blocks})

            } else {
                console.log("ошибка")
                dispatch({
                    type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                    payload: DATA_INSERTION_ERROR + " " + COORDINATE_CHANGE_ERROR
                })
            }
        } catch (e) {
            console.log("ошибка")
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                payload: DATA_INSERTION_ERROR + " " + COORDINATE_CHANGE_ERROR
            })
        }
    }
}