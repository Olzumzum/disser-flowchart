import {Component} from "react";
import Motion from "react-motion/lib/Motion";
import spring from "react-motion/lib/spring";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";


export class BlockContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            left: props.left,
            top: props.top,
            isRolledUp: props.isRolledUp
        }

        BlocksEventEmitter.subscribe(BlockTransformationTypes.ROLLED_UP_BLOCK, (data) => {
            if (data !== null && data !== undefined)
                this.setState({isRolledUp: data})
        })
    }

    render() {
        const {id, type, isRolledUp, top, left} = this.state
        return(
            <Motion defaultStyle={{opacity: 0}}
                        style={{opacity: isRolledUp ? spring(0) : spring(1)}}
            >
                {(interpolatedStyle) => (
                    <>
                        {!isRolledUp ? (
                            <div
                                className="menu-container"
                                style={{
                                    top: top,
                                    left: left,
                                    opacity: interpolatedStyle.opacity,
                                    padding: "9px",
                                }}
                            >
                                <div>
                                    {id}
                                </div>
                                <div>
                                    {type}
                                </div>
                                <div>
                                    какие-то параметры
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>

                )}
            </Motion >
        )
    }
}
