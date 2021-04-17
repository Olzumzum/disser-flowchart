import {Component, CSSProperties, FC} from "react";

import {Fade, Menu, MenuItem} from "@material-ui/core";

type BlockContextMenuProps = {
    style: CSSProperties
}

let styleMenu: CSSProperties = {
    display: "none"
}

export class BlockContextMenu extends Component<any, BlockContextMenuProps> {


    constructor(props: BlockContextMenuProps) {
        super(props);
        this.state = {
            style: styleMenu
        }
    }

    show(){
        this.state.style.display = "flex"
    }

    render() {
        return (
            <div id="myDropdown" className="dropdown-content" style={this.state.style}>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        )
    }
}