import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";
import {CSSProperties} from "react";

export class ContextMenu extends Component {
    state = {
        xPos: "0px",
        yPos: "0px",
        showMenu: false,
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    handleClick = (e) => {
        if (this.state.showMenu) this.setState({showMenu: false});
    }

    handleContextMenu = (e) => {
        this.setState({
            xPos: `${e.pageX}px`,
            yPos: `${e.pageY}px`,
            showMenu: true,
        });
    }

    render() {
        const {showMenu, yPos, xPos} = this.state;
        const menu = this.props.menu
        return (
            <Motion
                defaultStyle={{ opacity: 0 }}
                style={{ opacity: !showMenu ? spring(0) : spring(1) }}
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
                                    {menu.map((i) => <li>{i}</li>)}
                                </ul>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>

                )}
            </Motion>
        )}
}