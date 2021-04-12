import {createEditTab} from "../../components/editor/panel/EditTab";
import {blocksTypedSelector} from "../../components/editor/hooks/blocksTypedSelector";


export const oneClickBlock = (id: string) => {

}

export const doubleClickBlock = (id: string) => {
    // const {tabs} = blocksTypedSelector(state => state.tabs)
    console.log("dbclick " + id)
    // const tab =  createEditTab("id block")
    // tabs.push(tab)
}