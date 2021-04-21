import {IBlock} from "../primitives/IBlock";
import {BlockTypes} from "../primitives/BlockTypes";
import {IBlockFactory} from "./IBlockFactory";
import {ConditionBlockParent} from "../primitives/ConditionBlock";
import {ParentBlock} from "../primitives/ParentBlock";

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
        switch (typeBlock) {
            case BlockTypes.CONDITION: {
                return new ConditionBlockParent(id, left, top)
            }
            case BlockTypes.BLOCK:
                return new ParentBlock(id,left,top, null)

        }
        return undefined;

    }



    getOriginBlock(): Array<IBlock> {

        return [
            new ConditionBlockParent("0", 0, 0),
            new ConditionBlockParent("1", 0, 65)
        ]
    }
}

export function getPreviewBlock(typeBlock: string | symbol | null): IBlock | undefined {

    // let s: string = ""
    // if (typeof typeBlock === 'symbol') {
    //     s = typeBlock.toString()
    // } else {
    //     if (typeof typeBlock === 'string')
    //         s = typeBlock
    // }
    // switch (typeBlock){
    //     case BlockTypes.CONDITION:
            return new ParentBlock("preview", 0, 0, null)

    // }
}


//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}
