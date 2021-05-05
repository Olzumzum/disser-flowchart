import {IBlock} from "../primitives/bocks/IBlock";
import {BlockTypes} from "../primitives/bocks/BlockTypes";
import {IBlockFactory} from "./IBlockFactory";
import {ParentBlock} from "../primitives/bocks/ParentBlock";
import {Block} from "../primitives/bocks/Block";

/**
 * Создать блок, который будет существовать на панели редактирования
 */
export class CreatorBlock implements IBlockFactory {

    createBlock(
        id: string,
        typeBlock: string,
        left: number,
        top: number,
    ): IBlock | undefined {
        switch (typeBlock) {
            case BlockTypes.BLOCK_PARENT:
                return new ParentBlock(id, left, top)
            case BlockTypes.BLOCK:
                return new Block(id, left, top)
        }
        return undefined;
    }

}

export function getPreviewBlock(typeBlock: string | symbol | null): IBlock | undefined {
    // let s: string = ""
    // if (typeof typeBlock === 'symbol') {
    //     s = typeBlock.toString()
    // } else {
    //     if (typeof typeBlock === 'string')
    //         s = typeBlock
    // }x
    // switch (typeBlock){
    //     case BlockTypes.CONDITION:
    return new ParentBlock("preview", 0, 0)

    // }
}

//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}
