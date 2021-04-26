export interface IBlock {
    getId(): string,

    getTop(): number,
    setTop(top: number): void,

    getLeft(): number,
    setLeft(left: number): void,

    getTypeBlock(): string,

    render(): JSX.Element

    getParentId(): string
    setParentId(parentId: string): void

    getNeighborId(): string
    setNeighborId(neighbor: string): void

    getInnerLevel(): number
    setInnerLevel(innerLevel: number): void

    getParameter(): string
    setParameter(): string

    getComment(): string
    setComment(comment: string): void
}