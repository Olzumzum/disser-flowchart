import {EditTabsActionTypes} from "../actions/EditTabActionTypes";

export interface EditTabsState {
    tabs: any[],
    error: string | null
}

interface FetchEditTabs {
    type: EditTabsActionTypes.FETCH_EDIT_TABS,
    payload: any[],
}

interface FetchEditTabsError {
    type: EditTabsActionTypes.FETCH_EDOT_TABS_ERROR,
    payload: string | null
}

interface AddEditTab {
    type: EditTabsActionTypes.ADD_EDIT_TAB,
    payload: any,
}

export type EditTabsAction =
    FetchEditTabs
    | FetchEditTabsError
    | AddEditTab
