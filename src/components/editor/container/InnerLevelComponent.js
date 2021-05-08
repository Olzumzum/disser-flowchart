import React from "react";
import {convert, rendersDragBlock} from "../dnd/RendrerManager";
import {Collapse} from "react-collapse";
import PropTypes from 'prop-types';
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContainerTypes} from "./ContainerTypes";

export class InnerLevelComponent extends React.Component {
    static propTypes = {
        isOpened: PropTypes.bool,
        isContextMenuShowed: PropTypes.bool,
    };

    static defaultProps = {
        isOpened: false,
        idContainer: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpened: this.props.isOpened,
            level: 4,
            idContainer: this.props.id
        };


        BlocksEventEmitter.subscribe(ContainerTypes.IS_ROLLED, ([isOpened, idContainer]) => {
            if (!this.state.idContainer.localeCompare(idContainer))
                this.setState({isOpened: isOpened})

        })


    }

    render() {
        const {isOpened, level} = this.state
        return (
            <div id={this._id}
                 className={this.props.id}
                 style={this.props.styleContainer}
            >
                <Collapse isOpened={isOpened}>
                    {isOpened ?
                        Object.keys(this.props.contentContainer).map((id) =>
                            rendersDragBlock(convert(this.props.contentContainer)[Number(id)], id))
                        : <h1>Свернуто</h1>
                    }
                </Collapse>
            </div>
        )
    }
}