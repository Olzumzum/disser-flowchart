import {FC, useEffect} from "react";
import {Tabs} from "react-bootstrap";

import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {useActions} from "../hooks/blockActions";
import {EditTabsState} from "../../../store/types/editTabs";

export interface EditPanelProps {
    snapToGrid: boolean
}

//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}

export let superFlag: boolean = false
export function suFlag(){
    superFlag = true

}

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    const {tabs} = blocksTypedSelector(state => state.tabs)
    const {fetchEditTabs, addEditTab} = useActions()

    useEffect(() => {
        fetchEditTabs()
    }, [])



    return (
        <Tabs id="controlled-tab-example" defaultActiveKey={"Main tab"}>
            {tabs}
        </Tabs>

    )
}
