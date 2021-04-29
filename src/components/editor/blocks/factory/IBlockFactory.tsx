import {IBlock} from "../primitives/IBlock";

export interface IBlockFactory {
    createBlock(
        id: string,
        typeBlock: string,
        left: number,
        top: number,
    ): IBlock | undefined

    createBlockByType(
        typeBlock: string
    ): IBlock | undefined
}