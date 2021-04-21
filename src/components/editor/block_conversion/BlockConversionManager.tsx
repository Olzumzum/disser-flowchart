import {BlockTransformationTypes} from "./BlockTransformationTypes"
import {addBlocks, fetchBlocks} from "../../../store/action-creators/blocks";
import {BlockTypes} from "../blocks/primitives/BlockTypes";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {FC, useEffect} from "react";
import {useActions} from "../hooks/blockActions";

interface BlockConversionManagerProps {
    id: string
}


export const BlockConversionManager: FC<BlockConversionManagerProps> = ({id}) => {
    const creator: IBlockFactory = new CreatorBlock()
    // const {addBlocks} = useActions()
    //
    // useEffect(() => {
    //     fetchBlocks()
    // }, [])

    switch (id) {
        case BlockTransformationTypes.ADD_TWO_BLOCKS:
            // addBlocks(creator.createBlock(
            //     BlockTypes.BLOCK,
            //     50,
            //     40,
            //     "idNew"
            // )!!)
            break;

        case BlockTransformationTypes.LOOP_FOR:
            return null;
    }

    return (
        <div/>
    )

}