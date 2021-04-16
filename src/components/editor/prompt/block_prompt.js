import {Tooltip} from "react-bootstrap";
import {CONVERT_PROMPT} from "../../../assets/strings/editor_strings";

export const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        {CONVERT_PROMPT}
    </Tooltip>
);