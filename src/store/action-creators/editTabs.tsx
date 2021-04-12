import {Dispatch} from "redux";
import {EditTabsAction} from "../types/editTabs";
import {EditTabsActionTypes} from "../actions/EditTabActionTypes";
import {DATA_LOADING_ERROR} from "../../assets/errorMessadges";
import {createEditTab} from "../../components/editor/panel/EditTab";

const tab =  createEditTab("id block")


export const fetchEditTabs =() => {
    return async (dispatch: Dispatch<EditTabsAction>) => {
        try {
            dispatch({
                type: EditTabsActionTypes.FETCH_EDIT_TABS,
                payload: null
            })
            dispatch({
                type: EditTabsActionTypes.FETCH_EDOT_TABS_ERROR,
                payload: null
            })
        } catch (e){
            dispatch({
                type: EditTabsActionTypes.FETCH_EDOT_TABS_ERROR,
                payload: DATA_LOADING_ERROR,
            })
        }
    }
}
