import {CSSProperties} from "react";

export interface StyleBuilder {
    getStyle(): CSSProperties
}