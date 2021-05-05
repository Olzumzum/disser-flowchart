import {combineReducers} from "redux";
import {blockReducer} from "./blockReducer";

export const rootReducer = combineReducers({
    blocks: blockReducer,

})

export type RootState = ReturnType<typeof rootReducer>