
export interface IBlock {
    getId(): string,

    getTitle(): string,

    getTop(): number,
    setTop(top: number): void,

    getLeft(): number,
    setLeft(left: number): void,

    getTypeBlock(): string,

    render(): JSX.Element

    setPreviousNeighbor(id: string): void
    getPreviousNeighbor(): string | undefined

    setSubsequentNeighbor(id: string): void
    getSubsequentNeighbor(): string | undefined

}

