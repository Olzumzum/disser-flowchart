import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions/BlocksActionTypes";

import {
    COORDINATE_CHANGE_ERROR,
    DATA_INSERTION_ERROR,
    DATA_LOADING_ERROR,
    ERROR_ADDING_BLOCK,
    NOT_EXIST_BLOCK
} from "../../assets/strings/errorMessadges";
import {IBlock} from "../../components/editor/blocks/primitives/bocks/IBlock";
import {IConnect} from "../../components/editor/blocks/primitives/connects/IConnect";
import {containerKeeper} from "../../components/editor/panel/EditPanel";
import {recalculationCoorByEvent} from "../../components/editor/calculat_coordinates/blockCoordinates";
import {ff} from "../../components/editor/connections/ConnectionPainter";
import {ParameterManager} from "../../components/editor/blocks/parameters/ParameterManager";

const blocks = new Array<IBlock>()
const connects = new Array<IConnect>()

export function getConnects() {
    return connects
}

export function getBlock() {
    return blocks
}

/**
 *
 * загрузить список всех добавленных на панель редактирования блоков
 *
 */
export const fetchBlocks = () => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.FETCH_BLOCKS})
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

            dispatch({type: BlocksActionTypes.ADD_BLOCK, payload: block})

            //установить соседей
            settingUpNeighborhood(block.getParentId(), block.getId())
            //прерасчитать координаqты
            // recalculationCoorByEvent(block.getId())
            containerKeeper.addBlockToInnerLevel(block)

            // ff(block.getParentId(), block.getId())

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
export const changingBlockCoor = (id: string, left: number, top: number) => {
    let flag = false

    const item = getBlockById(id)
    if (item !== undefined) {
        if (left !== -1) item.setLeft(left)
        if (top !== -1) item.setTop(top)
        flag = true
    }

    searchBlockBeUpdate(item!!)
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


export function loadBlockById(id: string) {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            const block = getBlockById(id)
            if (block === undefined)
                dispatch({
                    type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                    payload: DATA_LOADING_ERROR + NOT_EXIST_BLOCK + id
                })
            else
                dispatch({
                    type: BlocksActionTypes.GET_BLOCK,
                    payload: block
                })
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR,
                payload: DATA_LOADING_ERROR
            })
        }
    }
}


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

/**
 * Задать соседство блоков
 * @param idParentBlock
 * @param idNewBlock
 */
export const settingUpNeighborhood = (idParentBlock: string, idNewBlock: string) => {

    //если родитель присутствует, мы задаем соседство
    //если родителя нет - его id = -1
    if (idParentBlock.localeCompare("-1")) {

        const parentBlock = getBlockById(idParentBlock)
        const newBlock = getBlockById(idNewBlock)
        //идентификатор прошлого соседа родителя
        const idPastNeighborBlock = parentBlock?.getChildId()
        //устанавливаем соседство между новым блоком и блоком, с которого вызывалось конекстное меню
        parentBlock?.setChildId(idNewBlock)

        //если у блока были соседи до этого
        if (idPastNeighborBlock !== undefined && idPastNeighborBlock.localeCompare("-1")
        && idPastNeighborBlock.localeCompare(idNewBlock)) {

            const pastNeihborBlock = getBlockById(idPastNeighborBlock)

            newBlock?.setChildId(idPastNeighborBlock)
            pastNeihborBlock?.setParentId(idNewBlock)

            searchBlockBeUpdate(pastNeihborBlock!!)
        }

        searchBlockBeUpdate(newBlock!!)

        searchBlockBeUpdate(parentBlock!!)


    }
}

/**
 * поиск блока, который необходимо обновить и его обновление
 * @param updateBlock - обновляемый блок
 */
export const searchBlockBeUpdate = (updateBlock: IBlock) => {
    blocks.forEach(item => {
        if (!item.getId().localeCompare(updateBlock.getId())) {
            item = updateBlock
        }
    })

    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            dispatch({type: BlocksActionTypes.UPDATE_BLOCKS})
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