import {IBlock} from "../primitives/IBlock";

export interface IBlockFactory {
    createBlock(
        typeBlock: string,
                // title: string,
                left: number,
                top: number,
                id: string
    ): IBlock | undefined

    getOriginBlock(): Array<IBlock>
}