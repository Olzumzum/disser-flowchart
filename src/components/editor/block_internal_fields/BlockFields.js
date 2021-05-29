import {Component} from "react";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";

export class BlockFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            idParameters: props.idParameters
        }

    }

    clickParametersField = () => {
        console.log("Параметр кликнут")
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK,
            {isParametersClick: true})
    }

    lossFocusParameterField = () => {
        console.log("onchage")
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK,
            {isParameterClick: false})
    }

    render() {
        const {id, type, idParameters} = this.state
        return (

            <div className="menu-container">
                {/*<div>*/}
                {/*    {id}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    {type}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    какие-то параметры*/}
                {/*</div>*/}


                <input type={"text"}
                       size={"10"}
                       placeholder={"параметры"}
                       id={idParameters}
                       onClick={this.clickParametersField}
                       onBlur={this.lossFocusParameterField}
                />
            </div>

        )
    }
}
