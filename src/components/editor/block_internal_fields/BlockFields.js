import {Component} from "react";

import spring from "react-motion/lib/spring";
import Motion from "react-motion/lib/Motion";
import {DisplayParameterValue} from "./DisplayParameterValue";
import {ParameterInputForm} from "./ParameterInputForm";
import Card from "react-bootstrap/Card";

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
        const {idParameters, nameParam, valueParam, typeParam, typeBlock, isShowInputForm} = this.state
        return (

            <Card className="menu-container" style={{width:"98%", height: "98%"}}>
                <Card.Body >
                    <Card.Title style={{marginBottom: 0, paddingBottom: 0}}>{typeBlock}</Card.Title>

                    <Card.Text style={{marginTop: 0, paddingTop: 0}}>
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
                                            typeParam={typeParam}
                                            updateData={this.updateData}
                                        />
                                    )}
                                </>

                            )}

                        </Motion>
                    </Card.Text>
                </Card.Body>
            </Card>

        )
    }
}
