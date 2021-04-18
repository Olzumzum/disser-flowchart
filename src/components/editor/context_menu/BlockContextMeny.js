import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";

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
                                }}
                            >
                                <ul className="menu">
                                    <li>Login</li>
                                    <li>Register</li>
                                    <li>Open Profile</li>
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