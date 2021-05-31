import {Component} from "react";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";
import {ParameterManager} from "../blocks/parameters/ParameterManager";
import {Button, FormControl, InputBase, InputLabel, NativeSelect, withStyles} from "@material-ui/core";
import {
    BUTTONBLOCK_LABEL,
    CHOICE_PARAMETER_TYPE,
    NAME_PARAMETER,
    VALUE_PARAMETER
} from "../../../assets/strings/blockStrings";
import {styleContainer as classes} from "../panel/StartTitleComp";
import {Row} from "react-bootstrap";
import {ParameterTypes} from "../blocks/parameters/ParameterTypes";
import spring from "react-motion/lib/spring";
import Motion from "react-motion/lib/Motion";


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

export class BlockFields extends Component {
    //менеджер записи параметров
    parameterManager = new ParameterManager()

    state = {
        selectParameterTypes: null,
        isShowInputForm: true,
    }


    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            idParameters: props.idParameters,
            nameParam: null,
            valueParam: null,
            typeParam: null,
            isShowInputForm: true,
        }

    }

    clickParametersField = () => {
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
    }

    lossFocusParameterField = () => {

    }

    handleChange = (event) => {
        this.setState({selectParameterTypes: event.target.value})
    }

    click = () => {
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
        const name_param = document.getElementById(this.props.idParameters + "name")
        const value_param = document.getElementById(this.props.idParameters + "value")
        const type_param = this.state.selectParameterTypes

        let param = this.parameterManager.getParameter(this.props.idParameters)
        if (param === undefined && name_param !== undefined && value_param !== undefined && type_param !== undefined) {
            let idParam = this.parameterManager.createParameter()

            this.parameterManager.setParameter(idParam, name_param.value, value_param.value,
                type_param)

            const param = this.parameterManager.getParameter(idParam)

            if (param !== undefined)
                this.setState({
                    nameParam: param.variable,
                    valueParam: param.value,
                    typeParam: param.type,
                    isShowInputForm: false,
                })
        }
        console.log("ftat " + this.state.isShowInputForm)
        // BlocksEventEmitter.dispatch(ContextMenuActionType.CANCELING_PARAMETER)
    }


    render() {
        const {nameParam, valueParam, typeParam, type, selectParameterTypes, isShowInputForm} = this.state
        return (

            <div className="menu-container">
                <div>
                    {type}
                </div>

                <Motion
                    defaultStyle={{opacity: 0}}
                    style={{opacity: !isShowInputForm ? spring(1) : spring(0)}}
                >
                    {() => (
                        <>
                            {isShowInputForm ? (
                                <div
                                    style={styleInputPanel}
                                >
                                    <Row>
                                        <FormControl className={classes.margin}>
                                            <InputLabel htmlFor="labelParName" style={{width: 20}}>
                                                {NAME_PARAMETER}
                                            </InputLabel>
                                            <BootstrapInput id={this.props.idParameters + "name"}
                                                            onClick={this.clickParametersField}/>
                                        </FormControl>
                                    </Row>
                                    <Row>
                                        <FormControl className={classes.margin}
                                                     style={{width: "80px", marginLeft: "2px"}}>
                                            <InputLabel htmlFor="labelParVal">
                                                {VALUE_PARAMETER}
                                            </InputLabel>
                                            <BootstrapInput id={this.props.idParameters + "value"}
                                                            onClick={this.clickParametersField}/>
                                        </FormControl>

                                        <FormControl className={classes.margin}>
                                            <InputLabel htmlFor="lableParType">{CHOICE_PARAMETER_TYPE}
                                            </InputLabel>
                                            <NativeSelect
                                                id={this.props.idParameters + "parType"}
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

                            ) : (

                                <div>
                                    <label>{nameParam}</label>
                                    <label>{valueParam}</label>
                                    <label>{typeParam}</label>
                                </div>
                            )}
                        </>

                    )}

                </Motion>
                <div>

                    <h6>{}</h6>
                </div>
            </div>

        )
    }
}
