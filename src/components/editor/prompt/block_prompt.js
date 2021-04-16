import {Tooltip} from "react-bootstrap";
import {CONVERT_PROMPT} from "../../../assets/strings/editor_strings";

export const renderConvertPrompt = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        {CONVERT_PROMPT}
    </Tooltip>
);