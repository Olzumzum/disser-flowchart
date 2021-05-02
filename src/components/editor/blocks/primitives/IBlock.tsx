import {CSSProperties} from "react";

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

    getParameterId(): string
    setParameterId(parameterId: string): void

    getCommentId(): string
    setCommentId(commentId: string): void

    getStyleBlock(): CSSProperties




}