import image_block from "../../../assets/images/block.png";
import {Component} from "react";

class Block extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const position = [this.props.x, this.props.y];

        return <img src={image_block} height={50} posetion={"absolute"}
                    style={{
                        position: 'absolute',
                        left: position[0],
                        top: position[1]
                    }}
        />;
    }

    // return <span>♘</span>

}

export default Block;