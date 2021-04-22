import {BlockTransformationTypes} from "./BlockTransformationTypes"
import {addBlocks, fetchBlocks} from "../../../store/action-creators/blocks";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {FC, useEffect} from "react";
import {useActions} from "../hooks/blockActions";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {ContextMenuEventEmitter} from "../context_menu/ContextMenuEventEmitter";
import {ContextMenuActionType} from "../context_menu/ContextMenuActionType";

interface BlockConversionManagerProps {
    id: string,
}


export const BlockConversionManager  = (props: BlockConversionManagerProps) => {
    const {id} = props
    // ContextMenuEventEmitter.dispatch(BlockTransformationTypes.LOOP_FOR)
    console.log("Менеджер ")
    switch (id) {
        case BlockTransformationTypes.ADD_TWO_BLOCKS:
            console.log("Менеджер добавляет ")
            ContextMenuEventEmitter.dispatch("BlockTransformationTypes.ADD_TWO_BLOCKS",
                "Строка")
            break;

        case BlockTransformationTypes.LOOP_FOR:
            return ContextMenuEventEmitter.dispatch(BlockTransformationTypes.LOOP_FOR)
    }


}