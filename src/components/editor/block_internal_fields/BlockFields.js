import {Component} from "react";

export class BlockFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
        }

    }

    render() {
        const {id, type} = this.state
        return (

            <div className="menu-container">
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

        )
    }
}
