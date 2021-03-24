import {IBlock} from "../../editor/blocks/primitives/IBlock";
import {BlocksActionTypes} from "../actions";

export interface BlockState {
    blocks: IBlock[];
    loading: boolean;
    error: null | string;
}

interface FetchBlocksAction {
    type: BlocksActionTypes.FETCH_BLOCKS;
}

interface FetchBlocksSuccess {
    type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS;
    payload: IBlock[];
}

interface FetchBlocksError {
    type: BlocksActionTypes.FETCH_BLOCKS_ERROR;
    payload: string;
}

interface AddBlock {
    // type
}

export type BlocksAction =
    FetchBlocksAction
    | FetchBlocksSuccess
    | FetchBlocksError
