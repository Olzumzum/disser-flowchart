import {IBlock} from "../../editor/blocks/primitives/IBlock";
import {CreatorBlock} from "../../editor/blocks/factory/CreatorBlock";
import {IBlockFactory} from "../../editor/blocks/factory/IBlockFactory";
import {BlocksActionTypes} from "../actions";
import {BlocksAction, BlockState} from "../types/blocks";


const initialState: BlockState = {
    blocks: [],
    loading: false,
    error: null,
}

export const blockReducer = (state: BlockState = initialState, action: BlocksAction): BlockState => {
    switch (action.type){
        case BlocksActionTypes.FETCH_BLOCKS:
            return {...state, loading: true}
        case BlocksActionTypes.FETCH_BLOCKS_SUCCESS:
            return {...state, loading: false, blocks: action.payload}
        case BlocksActionTypes.FETCH_BLOCKS_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}