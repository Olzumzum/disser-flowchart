import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";
import {ContextMenuEventEmitter} from "./ContextMenuEventEmitter"

export class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Pos: "0px",
            yPos: "0px",
            showMenu: this.props.showmenu,
            data: [],
        }
        this.handleContextMenu = this.handleContextMenu.bind(this)
        ContextMenuEventEmitter.subscribe('changeShowMenu',
            (event) => this.handleContextMenu(event))
    }



    componentDidMount() {
        document.addEventListener("click", this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    handleClick = (e) => {
        if (this.state.showMenu) this.setState({showMenu: false});
    }

    handleContextMenu = (e) => {

        console.log("show контекст меню")

        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            showMenu: true
        });

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
                                    top: yPos,
                                    left: xPos,
                                    opacity: interpolatedStyle.opacity,
                                    backgroundColor: "white",
                                    padding: "9px",
                                }}
                            >
                                <ul className="menu">
                                    {menu.map((i) => <li key={i} onClick={clickItemMenu}>{i}</li>)}
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

function clickItemMenu(id) {
    console.log("кликнули " + id.toString())
}