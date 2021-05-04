import {IBlock} from "../../components/editor/blocks/primitives/IBlock";
import {BlocksActionTypes} from "../actions/BlocksActionTypes";

//все, что может прийти о загрузке блоков
export interface BlockState {
    originBlocks: IBlock[];
    blocks: IBlock[];
    block: IBlock | null;
    loading: boolean;
    error: null | string;
}

//загрузка списка возможных блоков
interface FetchOriginalBlockAction {
    type: BlocksActionTypes.FETCH_ORIGIN_BLOCKS_SUCCESS;
    payload: IBlock[];
}

//получить блоки
interface FetchBlocksAction {
    type: BlocksActionTypes.FETCH_BLOCKS;
}

//успешная загрузка блоков, передача на обработку (отображение)
interface FetchBlocksSuccess {
    type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS;
    payload: IBlock[];
}

//ошибка загрузки блоков
interface FetchBlocksError {
    type: BlocksActionTypes.FETCH_BLOCKS_ERROR;
    payload: string | null;
}

//добавление нового элемента в список блоков
interface AddBlock {
    type: BlocksActionTypes.ADD_BLOCK;
    payload: IBlock;
}

//изменение блока
interface PuttData {
    type: BlocksActionTypes.PUT_DATA;
    payload: IBlock[];
}

interface UpdateBlocks {
    type: BlocksActionTypes.UPDATE_BLOCKS;
}

interface GetBlock {
    type: BlocksActionTypes.GET_BLOCK;
    payload: IBlock
}

//создание связи между блоками
interface CreateConnection {
    type: BlocksActionTypes.CREATE_CONNECTION;
    payload: IBlock[];
}

export type BlocksAction =
    FetchBlocksAction
    | FetchBlocksSuccess
    | FetchBlocksError
    | AddBlock
    | FetchOriginalBlockAction
    | PuttData
    | UpdateBlocks
    | CreateConnection
    | GetBlock
