import {CSSProperties, FC} from "react";
import {START_TITLE} from "../../../assets/strings/editor_strings";

const styleContainer: CSSProperties = {
    margin: 0,
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)"
}
const styleText: CSSProperties = {
    height: "10em",
    position: "relative"
}

/**
 * Надпись-приглашение для создания алгоритма
 * @constructor
 */
export const StartTitleComp: FC = () => {
    return (
        <div id={"start_title" } style={styleContainer}>
            <h4 style={styleText}>{START_TITLE}</h4>
        </div>
    )
}