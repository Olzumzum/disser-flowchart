import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions";
import {IBlockFactory} from "../../editor/blocks/factory/IBlockFactory";
import {CreatorBlock} from "../../editor/blocks/factory/CreatorBlock";
import {DATA_LOADING_ERROR, ERROR_ADDING_BLOCK} from "../../assets/errorMessadges";
import {IBlock} from "../../editor/blocks/primitives/IBlock";

const creatorBlocks: IBlockFactory = new CreatorBlock()
const originalBlocks = creatorBlocks.getOriginBlock()
const blocks= new Array<IBlock>()

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
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.ADD_BLOCK, payload: block})
            const response = blocks
             response.push(block)

        } catch (e){
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: ERROR_ADDING_BLOCK
            })
        }
    }
}