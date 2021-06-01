import React from "react";
import {Row} from "react-bootstrap";
import {FormControl, InputLabel, NativeSelect} from "@material-ui/core";
import {styleContainer as classes} from "../panel/StartTitleComp";
import {
    CHOICE_PARAMETER_TYPE,
    LABEL_BUTTONBLOCK,
    NAME_PARAMETER,
    VALUE_PARAMETER
} from "../../../assets/strings/blockStrings";
import {ParameterTypes} from "../blocks/parameters/ParameterTypes";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";
import {BlockButton} from "./BlockButton";
import {BootstrapInput} from "./BootstrapInput";
import {parameterManager} from "../panel/EditPanel";


const paramTypes = {
    boolean: ParameterTypes.boolean,
    string: ParameterTypes.string,
    number: ParameterTypes.number
}

const styleInputPanel = {
    margin: "25px",
    marginTop: 0
}

export class ParameterInputForm extends React.Component {

    state = {
        selectParameterTypes: null,
        nameParam: null,
        valueParam: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            idParameters: this.props.idParameters,
        }

        const param = parameterManager.getParameter(this.state.idParameters)

        if (param !== undefined
            && param.variable !== undefined
            && param.value !== undefined
            && param.type !== undefined) {
        }
        this.state.nameParam = param.variable;
        this.state.valueParam = param.value;
        this.state.selectParameterTypes = param.type;
    }


    clickParametersField = (event) => {
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
        event.target.focus()
    }


    handleChange = (event) => {
        this.setState({selectParameterTypes: event.target.value})
    }


    click = () => {
        const {idParameters, isShowInputForm, selectParameterTypes} = this.state;

        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
        const name_param = document.getElementById(idParameters + "name")
        const value_param = document.getElementById(idParameters + "value")
        const type_param = selectParameterTypes

        if (name_param !== undefined
            && value_param !== undefined
            && type_param !== undefined) {

            //задать занчения параметра
            parameterManager.setParameter(idParameters, name_param.value, value_param.value,
                type_param)
            //получить успешно созданный параметр из хранилища
            const param = parameterManager.getParameter(idParameters)

            if (param !== undefined)
                this.setState({
                    isShowInputForm: false,
                })
            this.props.updateData(isShowInputForm, param.variable, param.value, param.type)
        }

        // BlocksEventEmitter.dispatch(ContextMenuActionType.CANCELING_PARAMETER)
    }


    render() {
        const {idParameters, selectParameterTypes, nameParam, valueParam, typeParam} = this.state;

        return (
            <div
                style={styleInputPanel}
            >
                <Row>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="labelParName" style={{width: 20}}>
                            {NAME_PARAMETER}
                        </InputLabel>
                        <BootstrapInput id={idParameters + "name"}
                                        onClick={this.clickParametersField}
                                        value={nameParam}
                        />
                    </FormControl>
                </Row>
                <Row>
                    <FormControl className={classes.margin}
                                 style={{width: "80px", marginLeft: "2px"}}>
                        <InputLabel htmlFor="labelParVal">
                            {VALUE_PARAMETER}
                        </InputLabel>
                        <BootstrapInput id={idParameters + "value"}
                                        onClick={this.clickParametersField}
                                        value={valueParam}
                        />
                    </FormControl>

                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="lableParType">{CHOICE_PARAMETER_TYPE}
                        </InputLabel>
                        <NativeSelect
                            id={idParameters + "parType"}
                            value={selectParameterTypes}
                            onChange={this.handleChange}
                            input={<BootstrapInput/>}
                            onClick={this.clickParametersField}
                        >
                            <option aria-label="None" value=""/>
                            {Object.keys(paramTypes).map((v, i) => {
                                return (
                                    <option value={v}>{paramTypes[v]}</option>
                                )
                            })}
                        </NativeSelect>
                    </FormControl>
                </Row>
                <BlockButton variant="outlined" onClick={this.click}>
                    {LABEL_BUTTONBLOCK}
                </BlockButton>
            </div>
        );
    }
}