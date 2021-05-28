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
//ПОЧЕМУ 4 ЛЕВЕЛ
        this.state = {
            id: this.props.id,
            isOpened: this.props.isOpened,
            level: 4,
            idContainer: this.props.id,
            styleContainer: this.props.styleContainer,
        };


        BlocksEventEmitter.subscribe(ContainerTypes.IS_ROLLED, ([isOpened, idContainer]) => {
            if (!this.state.idContainer.localeCompare(idContainer))
                this.setState({isOpened: isOpened})


        })
    }

    render() {
        const {isOpened, id, level} = this.state
        const {top, left, height, width} = this.props

        return (
            <div id={id}
                 className={id}
                 style={ this.props.styleContainer}
            >
                <h6>{id}</h6>
                <Collapse isOpened={isOpened}>
                    {Object.keys(this.props.contentContainer).map((id) =>
                        rendersDragBlock(convert(this.props.contentContainer)[Number(id)], id))

                    }
                </Collapse>
            </div>
        )
    }
}