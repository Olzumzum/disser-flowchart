import React from "react";
import {styleContainerKeeper} from "./ContainerKeeper";

export class ContainerKeeperComponent extends React.Component {

    render() {
        return (
            <div style={styleContainerKeeper}>
                {Object.keys(this.props.members).map((id) =>
                    this.props.members[Number(id)].render())
                }
            </div>
        )
    }
}