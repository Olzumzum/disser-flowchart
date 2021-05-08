import React from "react";
import {convert, rendersDragBlock} from "../dnd/RendrerManager";

export class InnerLevelComponent extends React.Component {

    render() {
        return (
            <div id={this._id} className={this.props.id}
                 style={this.props.styleContainer} >
                {/*<h6> {this._id}</h6>*/}
                {Object.keys(this.props.contentContainer).map((id) =>
                    rendersDragBlock(convert(this.props.contentContainer)[Number(id)], id))
                }
            </div>
        )
    }
}