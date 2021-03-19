import {BlockProps} from "./ParentBlock";

export interface IBlock {
    getId(): string | undefined,
    setId(id: number): void,

    getTitle(): string,

    getTop(): number,
    setTop(top: number): void,

    getLeft(): number,
    setLeft(left: number): void,

    getTypeBlock(): string,
    setTypeBlock(type: string): void,

    render(): JSX.Element



}

