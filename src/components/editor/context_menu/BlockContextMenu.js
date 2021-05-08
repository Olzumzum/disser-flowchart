import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";
import {ContextMenuActionType} from "./ContextMenuActionType";
import {BlockConversionManager} from "../block_conversion/BlockConversionManager";
import {BlocksEventEmitter, BlocksEventEmitter as BlockEventEmitter} from "../BlocksEmitter";


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
        BlockEventEmitter.subscribe(ContextMenuActionType.SHOW_CONTEXT_MENU,
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
        if (this.state.showMenu)
            BlocksEventEmitter.dispatch(ContextMenuActionType.CLOSE_CONTEXT_MENU)
        document.removeEventListener("click", this.handleClick);
    }

    handleClick = (e) => {
        if (this.state.showMenu) this.setState({showMenu: false});
    }

    handleContextMenu = (e) => {
        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            showMenu: true
        });
        BlocksEventEmitter.dispatch(ContextMenuActionType.OVERLAP_CONTEXT_MENU)

    }

    render() {
        const {showMenu, yPos, xPos} = this.state;
        const menu = this.props.menu
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
                                    zIndex: 12,
                                    top: yPos,
                                    left: xPos,
                                    opacity: .9,
                                    backgroundColor: "white",
                                    padding: "9px",
                                }}
                            >
                                <ul className="menu" style={{zIndex: 13}}>
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
        BlocksEventEmitter.dispatch(ContextMenuActionType.CLOSE_CONTEXT_MENU)
        BlockConversionManager({id: e.target.id, idBlock: this.state.idBlock})
    }
}

