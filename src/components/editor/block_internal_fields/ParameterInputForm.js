import React from "react";
import {Row} from "react-bootstrap";
import {Button, FormControl, InputBase, InputLabel, NativeSelect, withStyles} from "@material-ui/core";
import {styleContainer as classes} from "../panel/StartTitleComp";
import {
    BUTTONBLOCK_LABEL,
    CHOICE_PARAMETER_TYPE,
    NAME_PARAMETER,
    VALUE_PARAMETER
} from "../../../assets/strings/blockStrings";
import {ParameterTypes} from "../blocks/parameters/ParameterTypes";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";
import {ParameterManager} from "../blocks/parameters/ParameterManager";


const paramTypes = {
    boolean: ParameterTypes.boolean,
    string: ParameterTypes.string,
    number: ParameterTypes.number
}

const styleInputPanel = {
    margin: "25px",
    marginTop: 0
}

const BlockButton = withStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        margin: "8px",
    },
}))(Button);

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '8px 8px 8px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export class ParameterInputForm extends React.Component {
//менеджер записи параметров
    parameterManager = new ParameterManager()

    state = {
        selectParameterTypes: null
    }

    constructor(props) {
        super(props);
        this.state = {
            idParameters: props.idParameters,
        }
    }


    clickParametersField = () => {
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
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

        let param = this.parameterManager.getParameter(idParameters)
        if (param === undefined
            && name_param !== undefined
            && value_param !== undefined
            && type_param !== undefined) {
            //создать параметр и получить его id
            let idParam = this.parameterManager.createParameter()
            //задать занчения параметра
            this.parameterManager.setParameter(idParam, name_param.value, value_param.value,
                type_param)
            //получить успешно созданный параметр из хранилища
            const param = this.parameterManager.getParameter(idParam)

            if (param !== undefined)
                this.setState({
                    isShowInputForm: false,
                })
            this.props.updateData(isShowInputForm, param.variable, param.value, param.type)
        }

        // BlocksEventEmitter.dispatch(ContextMenuActionType.CANCELING_PARAMETER)
    }


    render() {
        const {idParameters, selectParameterTypes} = this.state;

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
                                        onClick={this.clickParametersField}/>
                    </FormControl>
                </Row>
                <Row>
                    <FormControl className={classes.margin}
                                 style={{width: "80px", marginLeft: "2px"}}>
                        <InputLabel htmlFor="labelParVal">
                            {VALUE_PARAMETER}
                        </InputLabel>
                        <BootstrapInput id={idParameters + "value"}
                                        onClick={this.clickParametersField}/>
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
                    {BUTTONBLOCK_LABEL}
                </BlockButton>
            </div>
        );
    }
}