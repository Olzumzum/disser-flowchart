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
import {DisplayParameterValue} from "./DisplayParameterValue";
import {ParameterInputForm} from "./ParameterInputForm";

/**
 * Содержит в себе все конструкции для отображения и введения данных о блоке
 */
export class BlockFields extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            typeBlock: props.type,
            idParameters: props.idParameters,
            nameParam: null,
            valueParam: null,
            typeParam: null,
            isShowInputForm: true,
        }
    }

    updateData = (isShowInputForm, nameParam, valueParam, typeParam) => {
        this.setState({
            isShowInputForm: isShowInputForm,
            nameParam: nameParam,
            valueParam: valueParam,
            typeParam: typeParam
        })
    }


    render() {
        const { idParameters, nameParam, valueParam, typeParam, typeBlock, isShowInputForm} = this.state
        return (

            <div className="menu-container">
                <div>
                    {typeBlock}
                </div>

                <Motion
                    defaultStyle={{opacity: 0}}
                    style={{opacity: !isShowInputForm ? spring(1) : spring(0)}}
                >
                    {() => (
                        <>
                            {isShowInputForm ? (
                              <ParameterInputForm
                                  idParameters={idParameters}
                                  updateData={this.updateData}
                              />
                            ) : (
                                <DisplayParameterValue
                                    nameParam={nameParam}
                                    valueParam={valueParam}
                                    typeParam={typeParam}/>
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
