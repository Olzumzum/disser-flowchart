
export interface IBlock {
    getId(): string,
    setId(id: number): void,

    getTitle(): string,

    getTop(): number,
    setTop(top: number): void,

    getLeft(): number,
    setLeft(left: number): void,

    getTypeBlock(): string,
    setTypeBlock(type: string): void,

    render(): JSX.Element

    setPreviousNeighbor(id: string): void
    getPreviousNeighbor(): string

    setSubsequentNeighbor(id: string): void
    getSubsequentNeighbor(): string

}

