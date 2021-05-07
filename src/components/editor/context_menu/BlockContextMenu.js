import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";
import {ContextMenuActionType} from "./ContextMenuActionType";
import {BlockConversionManager} from "../block_conversion/BlockConversionManager";

import {BlocksEventEmitter as BlockEventEmitter} from "../BlocksEmitter";
import {green} from "@material-ui/core/colors";

/**
 * Контекстное меню, открывающееся по щелчку правой кнопки мыши на блоке.
 * Отображает список возможных действий (преобразований) с текущим элементом (блоком)
 */

export class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xPos: "0px",
            yPos: "0px",
            showMenu: false,
            idBlock: props.idBlock,
        }
        BlockEventEmitter.subscribe(ContextMenuActionType.CHANGE_SHOW_CONTEXT_MENU,
            (data) => {
                if (!data.idBlock.toString().localeCompare(this.state.idBlock)) {
                    this.handleContextMenu(data)
                }
            })
        this.handleContextMenu = this.handleContextMenu.bind(this)
    }
    componentDidMount() {
        document.addEventListener("click", this.handleClick);
    }


    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);

    }

    handleClick = (e) => {
        if (this.state.showMenu) this.setState({showMenu: false});
    }

    handleContextMenu = (e) => {
        this.setState({
            xPos: `${e.pageX}px` ,
            yPos: `${e.pageY}px`,
            showMenu: true
        });

    }

    defaultStyle ={
        opacity: 0,
        background: green,
    }

    render() {
        const {showMenu, yPos, xPos} = this.state;
        const menu = this.props.menu
        return (
            <Motion
                defaultStyle={this.defaultStyle}
                style={{opacity: !showMenu ? spring(0) : spring(1)}}
            >
                {(interpolatedStyle) => (
                    <>
                        {showMenu ? (
                            <div
                                className="menu-container"
                                style={{
                                    zIndex: 12,
                                    top: yPos,
                                    left: xPos,
                                    opacity: .9,
                                    backgroundColor: "white",
                                    padding: "9px",
                                }}
                            >
                                <ul className="menu">
                                    {menu.map((i) =>
                                        <li id={i.id} onClick={(e) => {
                                            if (showMenu)
                                                this.clickItemMenu(e)
                                        }
                                        }>{i.message}</li>
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>

                )}
            </Motion>
        )
    }

    clickItemMenu(e) {
        BlockConversionManager({id: e.target.id, idBlock: this.state.idBlock})
    }
}

