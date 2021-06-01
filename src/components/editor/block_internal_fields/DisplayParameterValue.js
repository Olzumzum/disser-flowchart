import React from "react";

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
    }

    render() {
        const {nameParam, valueParam, typeParam} = this.state;

        return(
            <div>
                <label>{nameParam}</label>
                <label>{valueParam}</label>
                <label>{typeParam}</label>
            </div>
        )
    }
}