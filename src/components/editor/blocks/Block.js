import image_block from "../../../assets/images/block.png";
import React, {Component} from 'react';
import uuid from 'react-uuid';

//не используется!!!
class Block extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // id: uuid(),
            x: props.x,
            y: props.y
        };
    }

    callId = () =>{
        return 12;
    }

    onChangeHandler(x,y){
        this.setState({x: x, y: y});
    }




    render() {
        const position = [this.state.x, this.state.y];

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



