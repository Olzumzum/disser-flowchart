import {FC} from "react";

import {Fade, Menu, MenuItem} from "@material-ui/core";


interface BlockContextMenuProps{

}

export const handleClose = () =>{

}

export const BlockContextMenu: FC<BlockContextMenuProps> = (props) => {

    return (
        <Menu
            id="fade-menu"
            // anchorEl=anchorEl
            keepMounted
            open
            onClose={handleClose}
            TransitionComponent={Fade}>

            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
    )
}