
import {ContextMenuEventEmitter} from "../context_menu/ContextMenuEventEmitter";
import {BlockTransformationTypes} from "./BlockTransformationTypes";
import {BlocksEventEmitter} from "./BlocksEmitter";


interface BlockConversionManagerProps {
    id: string,
}

export const BlockConversionManager  = (props: BlockConversionManagerProps) => {
    const {id} = props
    // ContextMenuEventEmitter.dispatch(BlockTransformationTypes.LOOP_FOR)
    // console.log("Менеджер ")
    switch (id) {
        case BlockTransformationTypes.ADD_TWO_BLOCKS:
            console.log("Менеджер добавляет ")
            BlocksEventEmitter.dispatch(BlockTransformationTypes.ADD_TWO_BLOCKS, false)
            break;

        case BlockTransformationTypes.LOOP_FOR:
            return ContextMenuEventEmitter.dispatch(BlockTransformationTypes.LOOP_FOR)
    }


}