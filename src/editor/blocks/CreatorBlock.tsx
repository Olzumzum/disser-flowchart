import {IBlock} from "./IBlock";
import {BlockTypes} from "./BlockTypes";
import {ConditionBlock} from "./ConditionBlock";
import {SubroutineBlockEx} from "./SubroutineBlockEx";

export interface BlockFactory {
    createBlock(typeBlock: string, title: string): IBlock | undefined
}

export class CreatorBlock implements BlockFactory{
    createBlock(typeBlock: string, title: string): IBlock | undefined {
        switch (typeBlock){
            case BlockTypes.CONDITION: return <ConditionBlock title={title}/>
            case BlockTypes.BLOCK: return <SubroutineBlockEx title={title}/>

        }
        return undefined;

    }



}