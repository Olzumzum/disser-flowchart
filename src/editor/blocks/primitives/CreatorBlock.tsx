import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";
import {ConditionBlock} from "./ConditionBlock";
import {SubroutineBlockEx} from "./SubroutineBlockEx";

export interface BlockFactory {
    createBlock(typeBlock: string,
                title: string,
                left: number,
                top: number
    ): IBlock | undefined
}

export class CreatorBlock implements BlockFactory {
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


}