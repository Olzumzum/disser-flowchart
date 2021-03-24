import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions";
import {IBlockFactory} from "../../editor/blocks/factory/IBlockFactory";
import {CreatorBlock} from "../../editor/blocks/factory/CreatorBlock";
import {DATA_LOADING_ERROR} from "../../assets/errorMessadges";
import {IBlock} from "../../editor/blocks/primitives/IBlock";

const creatorBlocks: IBlockFactory = new CreatorBlock()
const originalBlocks = creatorBlocks.getOriginBlock()


export const fetchBlocks = () => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
            const response = originalBlocks
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS, payload: response
            })
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: DATA_LOADING_ERROR
            })
        }
    }
}

// export const addBlocks = (block: IBlock): BlocksAction => {
//     return {type}
// }