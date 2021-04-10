import {BlocksAction} from "../types/blocks";
import {Dispatch} from "redux";
import {BlocksActionTypes} from "../actions";
import {IBlockFactory} from "../../components/editor/blocks/factory/IBlockFactory";
import {CreatorBlock} from "../../components/editor/blocks/factory/CreatorBlock";
import {
    COORDINATE_CHANGE_ERROR,
    DATA_INSERTION_ERROR,
    DATA_LOADING_ERROR,
    ERROR_ADDING_BLOCK
} from "../../assets/errorMessadges";
import {IBlock} from "../../components/editor/blocks/primitives/IBlock";
import {contextCanvas} from "../../components/editor/connections/CanvasPainter";
import {drawConnectionBlocks} from "../../components/editor/connections/drawConnection";
import {
    getWidthComponentPanel,
    leftCoorCanvas
} from "../../components/editor/calculationCoordinats/calculetionCoordinats";


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
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
            })
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

/**
 * добавление нового блока из панели компонентов
 * @param block
 */
export const addBlocks = (block: IBlock) => {
    return (dispatch: Dispatch<BlocksAction>) => {
        try {
            const response = blocks
            response.push(block)
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: null
            })
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

/**
 * Проверить при перемещении блока, не пытается ли пользователь создать связь между блоками.
 * Проверка осуществляется сравнением координат - если площади блоков пересекаются - создать связь
 * и не перемещать блок
 * @param id перемещаемого блока
 * @param left - координата перемещаемого блока
 * @param top - координата перемещаемого блока
 */
export const checkCoordinatesBlock = (id: string, left: number, top: number) => {
    let flag = false
    blocks.forEach(item => {
        if (!flag && item.getId()?.localeCompare(id)) {
            const blockWidth: number = document.getElementById(item.getId()!!)!!.clientWidth
            const blockTop: number = document.getElementById(item.getId()!!)!!.clientHeight

            if ((left >= item.getLeft() || (left + blockWidth) >= item.getLeft()) &&
                (left <= item.getLeft() + blockWidth) &&
                (top >= item.getTop() || (top + blockTop) >= item.getTop()) &&
                (top <= item.getTop() + blockTop)
            ) {
                console.log("Создать связь")
                setNeighborsBlocks(id, item.getId()!!)
                flag = true

            }
        }
    })

    return flag
}

/**
 * Задать соседство блоков
 * @param idOne - блок, идущий первым
 * @param idTwo - следующий блок
 */
const setNeighborsBlocks = (idOne: string, idTwo: string) => {
    let itemOne: IBlock | undefined
    let itemTwo: IBlock | undefined
    blocks.forEach(item => {
        if (item.getId()?.localeCompare(idOne)) itemOne = item
        if (item.getId()?.localeCompare(idTwo)) itemTwo = item
    })
    if (itemOne !== undefined && itemTwo !== undefined) {
        //ЗДЕСЬ НУЖНО БУДЕТ УЧЕСТЬ ТИП БЛОКА
        // if(itemOne.getTypeBlock() == "БЛОК ВХОДА" && itemTwo.getTypeBlock() == "БЛОК ВХОДА") ОШИБКА
        // if(itemOne.getTypeBlock() == "БЛОК ВХОДА") СДЕЛАТЬ ЕГО ПЕРВЫМ
        // if(itemTwo.getTypeBlock() == "БЛОК ВХОДА") СДЕЛАТЬ ЕГО ПЕРВЫМ

        setNeighbors(itemOne, itemTwo)
        console.log("Соседи предыдущий " + itemOne.getTop() + " последующий "
            + (itemOne.getLeft() - getWidthComponentPanel()!! + 20))
        const left = leftCoorCanvas(itemOne.getLeft())
        paintConnection(itemOne.getTop(), 50, 150)
    }

}

const setNeighbors = (itemOne: IBlock, itemTwo: IBlock) => {
    itemOne.setSubsequentNeighbor(itemTwo.getId()!!)
    itemTwo.setPreviousNeighbor(itemOne.getId()!!)
}

/**
 * Рисует связи между соединяемыми блоками
 */
const paintConnection = (x: number, y: number, height: number) => {
    const context = contextCanvas
    if (context !== null)
        drawConnectionBlocks(context, x, y, 50, 150)
}
