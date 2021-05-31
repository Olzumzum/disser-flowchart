import {Component} from "react";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";
import {ParameterManager} from "../blocks/parameters/ParameterManager";
import {FormControl, InputBase, InputLabel, NativeSelect, withStyles} from "@material-ui/core";
import {CHOICE_PARAMETER_TYPE, NAME_PARAMETER, VALUE_PARAMETER} from "../../../assets/strings/blockStrings";
import {styleContainer as classes} from "../panel/StartTitleComp";
import {Row} from "react-bootstrap";
import {ParameterTypes} from "../blocks/parameters/ParameterTypes";


const paramTypes = {
    boolean: ParameterTypes.boolean,
    string: ParameterTypes.string,
    number: ParameterTypes.number
}

const styleInputPanel = {
    margin: "25px",
    marginTop: 0
}

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
        selectParameterTypes: null
    }


    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            idParameters: props.idParameters,

        }

    }

    clickParametersField = () => {
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK)
    }

    lossFocusParameterField = () => {
        // console.log("параметры " + document.getElementById(this.props.idParameters).value)
        // let param = this.parameterManager.getParameter(this.props.idParameters)
        // if(param === undefined) {
        //     let idParam = this.parameterManager.createParameter()
        //     param = this.parameterManager.getParameter(idParam)
        // }
        // param.
        BlocksEventEmitter.dispatch(ContextMenuActionType.CANCELING_PARAMETER)
    }

    handleChange = (event) => {
        console.log("Выбранное значение " + event.target.value)
        const name_param = document.getElementById(this.props.idParameters + "name")
        const value_param = document.getElementById(this.props.idParameters + "value")
        console.log("Выбранное значение " + value_param.value)
    }


    render() {
        const {id, type, idParameters, selectParameterTypes} = this.state
        return (

            <div className="menu-container">
                <div>
                    {type}
                </div>


                <div
                    onClick={this.clickParametersField}
                    onBlur={this.lossFocusParameterField}
                    style={styleInputPanel}
                >
                    <Row>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="demo-customized-textbox" style={{width: 20}}
                            >{NAME_PARAMETER}</InputLabel>
                            <BootstrapInput id={this.props.idParameters + "name"}/>
                        </FormControl>
                    </Row>
                    <Row>
                        <FormControl className={classes.margin} style={{width: "80px", marginLeft: "2px"}}>
                            <InputLabel htmlFor="demo-customized-textbox">{VALUE_PARAMETER}</InputLabel>
                            <BootstrapInput id={this.props.idParameters + "value"}/>
                        </FormControl>

                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="demo-customized-select-native">
                                {CHOICE_PARAMETER_TYPE}</InputLabel>
                            <NativeSelect
                                id={this.props.idParameters + "parType"}
                                value={selectParameterTypes}
                                onChange={this.handleChange}
                                input={<BootstrapInput/>}
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
                </div>
                <div>
                    <h6>{}</h6>
                </div>
            </div>

        )
    }
}
