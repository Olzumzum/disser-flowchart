import {Col} from "react-bootstrap";

import {useDrop} from "react-dnd";

function Edit_panel(props){
    const [collectedProps, drop] = useDrop({
        accept
    })

        return (
            <Col sm={9} className={"bg-warning"}>
                <div ref={"drop"}>
                    Drop Target
                </div>

            </Col>
        )
}