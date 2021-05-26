import {IBlock} from "../primitives/bocks/IBlock";
import {BlockTypes} from "../primitives/bocks/BlockTypes";
import {IBlockFactory} from "./IBlockFactory";
import {ParentBlock} from "../primitives/bocks/ParentBlock";
import {Block} from "../primitives/bocks/Block";
import {Condition} from "../primitives/bocks/Condition";
import {Loop} from "../primitives/bocks/Loop";
import {InOutput} from "../primitives/bocks/InOutput";

/**
 * Создать блок, который будет существовать на панели редактирования
 */
export class CreatorBlock implements IBlockFactory {

    createBlock(
        id: string,
        typeBlock: string,
        left: number,
        top: number,
        parentId: string,
        innerLevel: number,
    ): IBlock | undefined {
        switch (typeBlock) {
            case BlockTypes.BLOCK:
                return new Block(id, left, top, parentId, innerLevel)
            case BlockTypes.CONDITION:
                return new Condition(id, left, top, parentId, innerLevel)
            case BlockTypes.LOOP:
                return new Loop(id, left, top, parentId, innerLevel)
            case BlockTypes.INOUTPUT:
                return new InOutput(id, left, top, parentId, innerLevel)
        }
        return undefined;
    }

}

//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}
