import {combineReducers} from "redux";
import {blockReducer} from "./blockReducer";
import {editTabsReducer} from "./editTabsReducer";

export const rootReducer = combineReducers({
    blocks: blockReducer,
    tabs: editTabsReducer
})

export type RootState = ReturnType<typeof rootReducer>