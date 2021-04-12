import {EditTabsAction, EditTabsState} from "../types/editTabs";
import {EditTabsActionTypes} from "../actions/EditTabActionTypes";

const initialState: EditTabsState = {
    tabs: null,
    error: null
}

export const editTabsReducer = (state: EditTabsState = initialState,
                                action: EditTabsAction): EditTabsState => {

    switch (action.type){
        case EditTabsActionTypes.FETCH_EDIT_TABS:
            return {...state, tabs: action.payload};
        case EditTabsActionTypes.FETCH_EDOT_TABS_ERROR:
            return {...state, error: action.payload}
    }
}