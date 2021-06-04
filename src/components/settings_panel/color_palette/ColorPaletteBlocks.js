import React from "react";
import CardGroup from 'react-bootstrap/CardGroup'
import Card from "react-bootstrap/Card";
import {BlockTypes} from "../../editor/blocks/primitives/bocks/BlockTypes";
import {FormControl, InputLabel, NativeSelect} from "@material-ui/core";
import {
    BLOCK_TITLE,
    CHOICE_PARAMETER_TYPE,
    CONDITION_TITLE,
    INOUTPUT_TITLE,
    LOOP_TITLE
} from "../../../assets/strings/blockStrings";
import {BootstrapInput} from "../../editor/block_internal_fields/BootstrapInput";
import {ColorValue} from "./ColorValue";
import {BlocksEventEmitter} from "../../editor/BlocksEmitter";
import {ContextMenuActionType} from "../../editor/context_menu/ContextMenuActionType";



export class ColorPaletteBlocks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colorCondition: ColorValue[0].name,
            colorBlock: ColorValue[0].name,
            colorLoop: ColorValue[0].name,
        }
    }

    colorchoicer = (value) => {
        let result = ColorValue[0].value
        ColorValue.forEach(item => {
           if(!value.localeCompare(item.name))
               result = item.value
        })
        return result
    }

    choiceBlockColor = (event) => {
        this.state.colorBlock = event.target.value
        console.log("просшушивание блока")
        this.props.updateDate(event.target.value)
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK,
            {type: BlockTypes.BLOCK, color: this.colorchoicer(this.state.colorBlock)})
    }

    choiceConditionColor = (event) => {
        this.state.colorCondition = event.target.value
        console.log("просшушивание условия")
        BlocksEventEmitter.dispatch(ContextMenuActionType.PARAMETERS_FIELD_CLICK,
            {type: BlockTypes.CONDITION,
                color: this.colorchoicer(this.state.colorCondition)})
    }

    choiceLoopColor = (event) => {
        this.state.colorLoop = event.target.value
    }

    render() {
        const {colorBlock, colorCondition} = this.state

        return (
            <div style={{margin: "15px"}}>
                <h3>Цвет блоков</h3>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>{BLOCK_TITLE}</Card.Title>
                            <Card.Text>
                                <FormControl>
                                    <InputLabel htmlFor="lableParType">{CHOICE_PARAMETER_TYPE}
                                    </InputLabel>
                                    <NativeSelect
                                        id={BlockTypes.BLOCK + "color"}
                                        value={colorBlock}
                                        onChange={this.choiceBlockColor}
                                        input={<BootstrapInput/>}
                                        // onClick={this.clickParametersField}
                                        // style={{cho: "transparent"}}
                                        size={1}
                                        style={{borderColor: '#80bdff',}}>
                                        <option aria-label={ColorValue[0].name}
                                                value={ColorValue[0].name}
                                                style={{backgroundColor: ColorValue[0].value}}
                                                selected/>

                                        <option aria-label={ColorValue[1].name}
                                                value={ColorValue[1].name}
                                                style={{backgroundColor: ColorValue[1].value}}/>

                                        <option aria-label={ColorValue[2].name}
                                                value={ColorValue[2].name}
                                                style={{backgroundColor: ColorValue[2].value}}/>
                                        <option aria-label={ColorValue[3].name}
                                                value={ColorValue[3].name}
                                                style={{backgroundColor: ColorValue[3].value}}/>

                                        <option aria-label={ColorValue[4].name}
                                                value={ColorValue[4].name}
                                                style={{backgroundColor: ColorValue[4].value}}/>

                                        <option aria-label={ColorValue[5].name}
                                                value={ColorValue[5].name}
                                                style={{backgroundColor: ColorValue[5].value}}/>

                                        <option aria-label={ColorValue[6].name}
                                                value={ColorValue[6].name}
                                                style={{backgroundColor: ColorValue[6].value}}/>
                                    </NativeSelect>
                                </FormControl>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>{CONDITION_TITLE}</Card.Title>
                            <Card.Text>
                                <FormControl>
                                    <InputLabel htmlFor="lableParType">{CHOICE_PARAMETER_TYPE}
                                    </InputLabel>
                                    <NativeSelect
                                        id={BlockTypes.CONDITION + "color"}
                                        value={colorBlock}
                                        onChange={this.choiceConditionColor}
                                        input={<BootstrapInput/>}
                                        // onClick={this.clickParametersField}
                                        // style={{cho: "transparent"}}
                                        size={1}
                                        style={{borderColor: '#80bdff',}}>
                                        <option aria-label={ColorValue[0].name}
                                                value={ColorValue[0].name}
                                                style={{backgroundColor: ColorValue[0].value}}
                                                selected/>

                                        <option aria-label={ColorValue[1].name}
                                                value={ColorValue[1].name}
                                                style={{backgroundColor: ColorValue[1].value}}/>

                                        <option aria-label={ColorValue[2].name}
                                                value={ColorValue[2].name}
                                                style={{backgroundColor: ColorValue[2].value}}/>
                                        <option aria-label={ColorValue[3].name}
                                                value={ColorValue[3].name}
                                                style={{backgroundColor: ColorValue[3].value}}/>

                                        <option aria-label={ColorValue[4].name}
                                                value={ColorValue[4].name}
                                                style={{backgroundColor: ColorValue[4].value}}/>

                                        <option aria-label={ColorValue[5].name}
                                                value={ColorValue[5].name}
                                                style={{backgroundColor: ColorValue[5].value}}/>

                                        <option aria-label={ColorValue[6].name}
                                                value={ColorValue[6].name}
                                                style={{backgroundColor: ColorValue[6].value}}/>
                                    </NativeSelect>
                                </FormControl>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>{LOOP_TITLE}</Card.Title>
                            <Card.Text>
                                <FormControl>
                                    <InputLabel htmlFor="lableParType">{CHOICE_PARAMETER_TYPE}
                                    </InputLabel>
                                    <NativeSelect
                                        id={BlockTypes.BLOCK + "color"}
                                        value={colorBlock}
                                        onChange={this.choiceLoopColor}
                                        input={<BootstrapInput/>}
                                        // onClick={this.clickParametersField}
                                        // style={{cho: "transparent"}}
                                        size={1}
                                        style={{borderColor: '#80bdff',}}>
                                        <option aria-label={ColorValue[0].name}
                                                value={ColorValue[0].name}
                                                style={{backgroundColor: ColorValue[0].value}}
                                                selected/>

                                        <option aria-label={ColorValue[1].name}
                                                value={ColorValue[1].name}
                                                style={{backgroundColor: ColorValue[1].value}}/>

                                        <option aria-label={ColorValue[2].name}
                                                value={ColorValue[2].name}
                                                style={{backgroundColor: ColorValue[2].value}}/>
                                        <option aria-label={ColorValue[3].name}
                                                value={ColorValue[3].name}
                                                style={{backgroundColor: ColorValue[3].value}}/>

                                        <option aria-label={ColorValue[4].name}
                                                value={ColorValue[4].name}
                                                style={{backgroundColor: ColorValue[4].value}}/>

                                        <option aria-label={ColorValue[5].name}
                                                value={ColorValue[5].name}
                                                style={{backgroundColor: ColorValue[5].value}}/>

                                        <option aria-label={ColorValue[6].name}
                                                value={ColorValue[6].name}
                                                style={{backgroundColor: ColorValue[6].value}}/>
                                    </NativeSelect>
                                </FormControl>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>{INOUTPUT_TITLE}</Card.Title>
                            <Card.Text>
                                <FormControl>
                                    <InputLabel htmlFor="lableParType">{CHOICE_PARAMETER_TYPE}
                                    </InputLabel>
                                    <NativeSelect
                                        id={BlockTypes.BLOCK + "color"}
                                        value={colorBlock}
                                        // onChange={this.choiceLoopColor}
                                        input={<BootstrapInput/>}
                                        // onClick={this.clickParametersField}
                                        // style={{cho: "transparent"}}
                                        size={1}
                                        style={{borderColor: '#80bdff',}}>
                                        <option aria-label={ColorValue[0].name}
                                                value={ColorValue[0].name}
                                                style={{backgroundColor: ColorValue[0].value}}
                                                selected/>

                                        <option aria-label={ColorValue[1].name}
                                                value={ColorValue[1].name}
                                                style={{backgroundColor: ColorValue[1].value}}/>

                                        <option aria-label={ColorValue[2].name}
                                                value={ColorValue[2].name}
                                                style={{backgroundColor: ColorValue[2].value}}/>
                                        <option aria-label={ColorValue[3].name}
                                                value={ColorValue[3].name}
                                                style={{backgroundColor: ColorValue[3].value}}/>

                                        <option aria-label={ColorValue[4].name}
                                                value={ColorValue[4].name}
                                                style={{backgroundColor: ColorValue[4].value}}/>

                                        <option aria-label={ColorValue[5].name}
                                                value={ColorValue[5].name}
                                                style={{backgroundColor: ColorValue[5].value}}/>

                                        <option aria-label={ColorValue[6].name}
                                                value={ColorValue[6].name}
                                                style={{backgroundColor: ColorValue[6].value}}/>
                                    </NativeSelect>
                                </FormControl>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </div>
        )
    }

}