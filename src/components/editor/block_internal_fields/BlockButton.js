import {Button, withStyles} from "@material-ui/core";

export const BlockButton = withStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        margin: "8px",
        justifyContent: "center",
        alignItem: "center",
    },
}))
(Button);