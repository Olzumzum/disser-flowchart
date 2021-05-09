import React from "react";
import {styleContainerKeeper} from "./ContainerKeeper";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContainerTypes} from "./ContainerTypes";

export class ContainerKeeperComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            members: this.props.members
        }

        BlocksEventEmitter.subscribe(ContainerTypes.HIDE_CONTENT, (data) => {
            this.setState({members: data})
        })
    }

    render() {
        const {members} = this.state
        return (
            <div style={styleContainerKeeper}>
                {Object.keys(members).map((id) =>
                    members[Number(id)].render())
                }
            </div>
        )
    }
}