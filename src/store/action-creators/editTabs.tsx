import {Dispatch} from "redux";
import {EditTabsAction} from "../types/editTabs";
import {EditTabsActionTypes} from "../actions/EditTabActionTypes";
import {DATA_LOADING_ERROR} from "../../assets/strings/errorMessadges";
import {createEditTab} from "../../components/editor/panel/EditTab";

const tabs = Array<any>(createEditTab("Main tab"))


export const fetchEditTabs =() => {
    return async (dispatch: Dispatch<EditTabsAction>) => {
        try {
            dispatch({
                type: EditTabsActionTypes.FETCH_EDIT_TABS,
                payload: tabs
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

export const addEditTab = () => {
    return async (dispatch: Dispatch<EditTabsAction>) => {
        try {
            const tab =  createEditTab("Tab " + tabs.length)
            tabs.push(tab)

            dispatch({
                type: EditTabsActionTypes.ADD_EDIT_TAB,
                payload: tab
            })

        }catch (e){

        }
    }
}
