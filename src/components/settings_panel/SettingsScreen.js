import React, {FC} from "react";
import {Button, makeStyles} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {SAVE_SETTINGS_EDITOR, SETTINGS_EDITOR} from "../../assets/strings/editor_strings";
import {ColorPaletteBlocks} from "./color_palette/ColorPaletteBlocks";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export let COLOR_BLOCK = '#000000'
export let COLOR_CONDITION = '#000000'
export let COLOR_LOOP = '#000000'
export let COLOR_INOUTPUT = '#000000'

export class SettingsScreen extends React.Component{
    conditionColor = ""

    constructor(props) {
        super(props);
        this.state = {
            isOpenSettings: this.props.isOpenSettings
        }
        this.handleClose = this.handleClose.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    handleClose = () => {
        this.state.isOpenSettings = false
    };

    onSave = () =>{
        COLOR_CONDITION = this.conditionColor
        this.state.isOpenSettings = false
    }

    updateDate(condColor){
        this.conditionColor = condColor
        COLOR_CONDITION = this.conditionColor
    }

    render() {
        const {isOpenSettings} = this.props
        this.state.isOpenSettings = isOpenSettings

        return(
            <Dialog fullScreen open={this.state.isOpenSettings}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
            >

                <AppBar
                        style={{ position: 'relative',}}>
                     <Toolbar>
                        <IconButton edge="start"
                                    onClick={this.props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>

                        <Typography variant="h6"
                        style={{
                            marginLeft: "20px",
                            flex: 1,
                        }}>
                            {SETTINGS_EDITOR}
                        </Typography>

                        <Button autoFocus color="inherit"
                                onClick={this.props.handleClose}>
                            {SAVE_SETTINGS_EDITOR}
                         </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ColorPaletteBlocks updateDate={this.updateDate}/>
                   <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List>
            </Dialog>
        )
    }


}