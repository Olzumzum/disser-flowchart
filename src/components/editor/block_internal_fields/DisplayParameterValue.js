import React from "react";
import Card from 'react-bootstrap/Card'
import {Chip} from "@material-ui/core";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";


export class DisplayParameterValue extends React.Component {

    state = {
        nameParam: null,
        valueParam: null,
        typeParam: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            nameParam: this.props.nameParam,
            valueParam: this.props.valueParam,
            typeParam: this.props.typeParam,
        }
        BlocksEventEmitter.dispatch(ContextMenuActionType.CANCELING_PARAMETER)
    }

    click = () => {
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
        this.props.updateData(true)
    }


    render() {
        const {nameParam, valueParam, typeParam} = this.state;

        return (
            <div>
                <Card style={{margin: '7px 7px 0px 0px'}}>
                    <Card.Text>
                        <label>{nameParam}</label>
                        <label>{valueParam}</label>
                        <Chip
                            label={typeParam}
                            onClick={this.click}
                        />
                    </Card.Text>
                </Card>

                {/*<BlockButton variant="outlined"*/}
                {/*             onClick={this.click}*/}
                {/*             color="secondary">*/}
                {/*    {EDIT_BUTTONBLOCK}*/}
                {/*</BlockButton>*/}
            </div>
        )
    }
}