import {IBlock} from "../primitives/IBlock";
import {BlockTypes} from "../primitives/BlockTypes";
import {IBlockFactory} from "./IBlockFactory";
import {ConditionBlockParent} from "../primitives/ConditionBlock";
import {SubroutineBlock} from "../primitives/SubroutineBlockEx";

/**
 * Создать блок, который будет существовать на панели редактирования
 */
export class CreatorBlock implements IBlockFactory {
    createBlock(
        typeBlock: string,
        left: number,
        top: number,
        id: string
    ): IBlock | undefined {
        // console.log("create block " + typeBlock)
        switch (typeBlock) {
            case BlockTypes.CONDITION: {
                // console.log("ConditionBlock " + id + " " + left + " " + top)
                return new ConditionBlockParent(id, left, top)
            }
            case BlockTypes.BLOCK:
                return new SubroutineBlock()

        }
        return undefined;

    }

    getOriginBlock(): Array<IBlock> {
        let one = new ConditionBlockParent("0", 0, 0)
        return [
            one,
        ]
    }
}
