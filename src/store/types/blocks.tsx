import {IBlock} from "../../editor/blocks/primitives/IBlock";
import {BlocksActionTypes} from "../actions";

export interface BlockState {
    originBlocks: IBlock[];
    blocks: IBlock[];
    loading: boolean;
    error: null | string;
}

interface FetchOriginalBlockAction {
    type: BlocksActionTypes.FETCH_ORIGIN_BLOCKS_SUCCESS;
    payload: IBlock[];
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
    type: BlocksActionTypes.ADD_BLOCK;
    payload: IBlock;
}

export type BlocksAction =
    FetchBlocksAction
    | FetchBlocksSuccess
    | FetchBlocksError
    | AddBlock
    | FetchOriginalBlockAction
