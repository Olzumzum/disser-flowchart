import {CSSProperties} from "react";
import {LineCanvas} from "../../../canvas/LineCanvas";

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

    getChildId(): string
    setChildId(neighbor: string): void

    getInnerLevel(): number
    setInnerLevel(innerLevel: number): void

    getParameterId(): string
    setParameterId(parameterId: string): void

    getCommentId(): string
    setCommentId(commentId: string): void

    getStyleBlock(): CSSProperties

    getBlockShape(): LineCanvas[]

    getNeighbourId(): string
    setNeighbourId(id: string): void


}