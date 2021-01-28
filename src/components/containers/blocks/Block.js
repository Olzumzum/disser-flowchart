import image_block from "../../../assets/images/block.png";
import {Component} from "react";

class Block extends Component {

    constructor(props) {
        super(props);
        this.handle = this.handle.bind(this);
        // this.state = {x: 0, y: 0};

        // console.log(this.state.x = " adddd" + this.state.y);
    }

    handle(e){
        this.props.onPositionChanged({x: e.target.x, y: e.target.y});

        console.log(this.props.x = " adddd" + this.props.y);
    }


    render() {
        const position = [this.props.x, this.props.y];

        return <img src={image_block} height={50} posetion={"absolute"} onChange={this.handle}
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