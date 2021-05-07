import {IBlock} from "../primitives/bocks/IBlock";

export interface IBlockFactory {
    createBlock(
        id: string,
        typeBlock: string,
        left: number,
        top: number,
        parentId: string,
        innerLevel: number
    ): IBlock | undefined

}