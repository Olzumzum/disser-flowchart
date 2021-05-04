import {DragItem} from "../../components/editor/dnd/DragItem";
import {DropTargetMonitor} from "react-dnd";
import {Dispatch} from "redux";
import {BlocksAction} from "../types/blocks";
import {snapToGrid as doSnapToGrid} from "../../components/editor/dnd/snapToGrid";
import {BlocksActionTypes} from "../actions/BlocksActionTypes";
import {ERROR_ADDING_BLOCK} from "../../assets/strings/errorMessadges";
import {contextCanvas} from "../../components/editor/canvas/CanvasPainter";
import {changingBlockCoor, getBlock, getBlockById} from "./blocks";

export const dragBlock = (item: DragItem, monitor: DropTargetMonitor, snapToGrid: boolean) => {
    return async (dispatch: Dispatch<BlocksAction>) => {
        try {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number
                y: number
            }

            let left = Math.round(item.left + delta.x)
            let top = Math.round(item.top + delta.y)

            if (snapToGrid) {
                ;[left, top] = doSnapToGrid(left, top)
            }

            console.log("Мы перетаскиваем " + item.id)
            //перетаскиваем блок
            changingBlockCoor(item.id, left, top)

            dispatch({type: BlocksActionTypes.FETCH_BLOCKS_SUCCESS, payload: getBlock()})
        } catch (e) {
            dispatch({
                type: BlocksActionTypes.FETCH_BLOCKS_ERROR, payload: ERROR_ADDING_BLOCK
            })
        }
    }
}
