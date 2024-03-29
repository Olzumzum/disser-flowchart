
import {BlockTransformationTypes} from "./BlockTransformationTypes";
import {BlocksEventEmitter} from "../BlocksEmitter";


interface BlockConversionManagerProps {
    id: string,
    idBlock: string
}

export const BlockConversionManager  = (props: BlockConversionManagerProps) => {
    const {id, idBlock} = props

    switch (id) {
        case BlockTransformationTypes.CONDITIONAL_OPERATOR:
            BlocksEventEmitter.dispatch(BlockTransformationTypes.CONDITIONAL_OPERATOR,
                [{isInit: false}, {idBlock: idBlock}])
            break;
        case BlockTransformationTypes.ADD_TWO_BLOCKS:
            BlocksEventEmitter.dispatch(BlockTransformationTypes.ADD_TWO_BLOCKS, [{isInit: false}, {idBlock: idBlock}])
            break;

        case BlockTransformationTypes.LOOP_FOR:
            return BlocksEventEmitter.dispatch(BlockTransformationTypes.LOOP_FOR, [{isInit: false}, {idBlock: idBlock}])
            break;
        case BlockTransformationTypes.INOUTPUT:
            return BlocksEventEmitter.dispatch(BlockTransformationTypes.INOUTPUT, [{isInit: false}, {idBlock: idBlock}])
            break;

    }
}