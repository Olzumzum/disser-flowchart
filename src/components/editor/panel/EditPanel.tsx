import {FC} from "react";
import {Tabs} from "react-bootstrap";
import {createEditTab} from "./EditTab";

export interface EditPanelProps {
    snapToGrid: boolean
}

//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}

const tab = createEditTab("index")

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    // const {tabs, error} = blocksTypedSelector(state => state.tabs)
    // const {} = useActions()
    return (
        <Tabs id="controlled-tab-example">
            {/*{tabs}*/}
            {tab}
        </Tabs>

    )
}