import {EditTabsActionTypes} from "../actions/EditTabActionTypes";

export interface EditTabsState {
    tabs: string | null,
    error: string | null
}

interface FetchEditTabs {
    type: EditTabsActionTypes.FETCH_EDIT_TABS,
    payload: string | null,
}

interface FetchEditTabsError {
    type: EditTabsActionTypes.FETCH_EDOT_TABS_ERROR,
    payload: string | null
}

export type EditTabsAction =
    FetchEditTabs
    | FetchEditTabsError
