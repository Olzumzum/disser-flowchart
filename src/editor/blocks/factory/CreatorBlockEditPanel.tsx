import {IBlock} from "../primitives/IBlock";
import {BlockTypes} from "../primitives/BlockTypes";
import {ConditionBlock} from "../primitives/ConditionBlock";
import {SubroutineBlockEx} from "../primitives/SubroutineBlockEx";
import {IBlockFactory} from "./IBlockFactory";
import {originalBlocks} from "./originBlocks";

/**
 * Создать блок, который будет существовать на панели редактирования
 */
export class CreatorBlockEditPanel implements IBlockFactory {
    createBlock(
        typeBlock: string,
        title: string,
        left: number,
        top: number): IBlock | undefined {
        switch (typeBlock) {
            case BlockTypes.CONDITION:
                return <ConditionBlock title={title} left={left} top={top} />
            case BlockTypes.BLOCK:
                return <SubroutineBlockEx title={title} left={left} top={top}/>

        }
        return undefined;

    }

    getOriginBlock(): any {
        return originalBlocks
    }
}
