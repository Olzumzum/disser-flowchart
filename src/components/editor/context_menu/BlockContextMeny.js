import {Component} from "react";

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
            <div>
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
                                {this.props.menu}
                            </div>
                        ) : (
                            <></>
                        )}
                    </>

                )}
            </div>
        )}
}