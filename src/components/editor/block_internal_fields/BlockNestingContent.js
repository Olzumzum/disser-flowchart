import React from "react";
import {OverlayTrigger} from "react-bootstrap";
import {renderConvertPrompt} from "../prompt/block_prompt";
import {ContextMenu} from "../context_menu/BlockContextMenu";
import {itemsContexMenu} from "../context_menu/ItemsContextMenu";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";
import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";
import {BlockFields} from "./BlockFields";


export class BlockNestingContent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            idBlock: props.id,
            typeBlock: props.typeBlock,
            left: props.left,
            top: props.top,
            isRollingUp: props.isRolledUp,
            style: props.style,
        }
    }

    /**
     * вызов контекстного меню блока
     * @param e
     */
    mouseDownClick = (e) => {
        if (e.button === 2)
            BlocksEventEmitter.dispatch(ContextMenuActionType.CHANGE_SHOW_CONTEXT_MENU,
                {idBlock: this.state.idBlock})
    }

    rolleUpContent =() =>{
        this.state.isRolledUp = !this.state.isRolledUp;
        BlocksEventEmitter.dispatch(BlockTransformationTypes.ROLLED_UP_BLOCK,
            [{isRolledUp: this.state.isRolledUp}, {idBlock: this.state.idBlock}] )
    }


    render() {
        const {idBlock, typeBlock, left, top, isRollingUp, style} = this.state
        return (
            <div>
                <OverlayTrigger
                    placement={"right"}
                    delay={{show: 250, hide: 400}}
                    overlay={renderConvertPrompt}>
                    <div
                        id={idBlock}
                        style={style}
                        onMouseDown={this.mouseDownClick}
                        onClick={this.rolleUpContent}
                    >
                        <BlockFields id={idBlock}
                                      type={typeBlock}
                                      isRolledUp={isRollingUp}
                                      left={left}
                                      top={top}
                        />
                    </div>
                </OverlayTrigger>
                <ContextMenu menu={itemsContexMenu} idBlock={idBlock}/>
            </div>
        )
    }
}