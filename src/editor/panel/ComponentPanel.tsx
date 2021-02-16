import {Col} from "react-bootstrap";
import {DraggableBlock} from "../blocks/DraggableBlock";
import {CSSProperties, useCallback, useState} from "react";
import {BlockMap, renderBlock} from "./EditPanel";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {DragItem} from "../DragItem";
import {snapToGrid as doSnapToGrid} from "../snapToGrid";
import update from "immutability-helper";

const styles: CSSProperties = {
    margin: 0,
    float: "left",
    height: 400,
    width: "20%",
    backgroundColor: 'darkgray',
}


export let originalBlocks: any = {
    a13: {top: 0, left: 0, title: 'Orig 1'},
    a23: {top: 60, left: 0, title: 'Orig 2'},
}

export const ComponentPanel = () => {

    return(
        <div >
            <div id={"component_panel"} style={styles}>
                {Object.keys(originalBlocks).map((key) => renderBlock(originalBlocks[key], key))}
            </div>
        </div>
    )
}