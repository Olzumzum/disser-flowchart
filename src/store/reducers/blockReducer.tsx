import {BlocksActionTypes} from "../actions";
import {BlocksAction, BlockState} from "../types/blocks";


const initialState: BlockState = {
    originBlocks: [],
    blocks: [],
    loading: false,
    error: null,
}

export const blockReducer = (state: BlockState = initialState, action: BlocksAction): BlockState => {
    switch (action.type){
        case BlocksActionTypes.ADD_BLOCK:
            return {...state}
        case BlocksActionTypes.FETCH_BLOCKS:
            return {...state, loading: true}
        case BlocksActionTypes.FETCH_BLOCKS_SUCCESS:
            return {...state, loading: false, blocks: action.payload}
        case BlocksActionTypes.FETCH_BLOCKS_ERROR:
            return {...state, loading: false, error: action.payload}
        case BlocksActionTypes.FETCH_ORIGIN_BLOCKS_SUCCESS:
            return {...state, loading: false, originBlocks: action.payload}
        case BlocksActionTypes.PUT_DATA:
            return {...state}
        default:
            return state
    }
}