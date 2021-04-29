import {IBlock} from "../primitives/IBlock";
import {BlockTypes} from "../primitives/BlockTypes";
import {IBlockFactory} from "./IBlockFactory";
import {ParentBlock} from "../primitives/ParentBlock";

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
            case BlockTypes.BLOCK:
                return new ParentBlock(id, left, top)
        }
        return undefined;
    }

    createBlockByType(
        typeBlock: string
    ): IBlock | undefined {
        const id = generateId()

        switch (typeBlock) {
            case BlockTypes.BLOCK:
                return new ParentBlock(id, 150, 50)
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
