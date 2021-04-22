import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";
import {ContextMenuEventEmitter} from "./ContextMenuEventEmitter"
import {ContextMenuActionType} from "./ContextMenuActionType";
import {BlockConversionManager} from "../block_conversion/BlockConversionManager";

/**
 * Контекстное меню, открывающееся по щелчку правой кнопки мыши на блоке.
 * Отображает список возможных действий (преобразований) с текущим элементом (блоком)
 */

export class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Pos: "0px",
            yPos: "0px",
            showMenu: false,
            data: []
        }
        this.handleContextMenu = this.handleContextMenu.bind(this)
        ContextMenuEventEmitter.subscribe(ContextMenuActionType.CHANGE_SHOW_CONTEXT_MENU,
            (data) => this.handleContextMenu(data))
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

    handleContextMenu = (e, data) => {
        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            showMenu: true
        });

    }

    render() {
        const {showMenu, yPos, xPos} = this.state;
        const menu = this.props.menu
        console.log("Рендеринг конекстного меню")

        return (
            <Motion
                defaultStyle={{opacity: 0}}
                style={{opacity: !showMenu ? spring(0) : spring(1)}}
            >
                {(interpolatedStyle) => (
                    <>
                        {showMenu ? (
                            <div
                                className="menu-container"
                                style={{
                                    top: yPos,
                                    left: xPos,
                                    opacity: interpolatedStyle.opacity,
                                    backgroundColor: "white",
                                    padding: "9px",
                                }}
                            >
                                <ul className="menu">
                                    {menu.map((i) =>
                                        <li id={i.id} onClick={(e) => {
                                            if (showMenu)
                                                clickItemMenu(e)
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
}

function clickItemMenu(e) {

    console.log("id " + e.target.id)
    BlockConversionManager({id: e.target.id})
}