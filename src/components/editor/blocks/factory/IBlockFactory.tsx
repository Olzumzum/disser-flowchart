import {IBlock} from "../primitives/IBlock";

export interface IBlockFactory {
    createBlock(
        typeBlock: string,
                left: number,
                top: number,
    ): IBlock | undefined
}