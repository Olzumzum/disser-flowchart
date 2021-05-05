import {LineCanvas} from "../../../canvas/LineCanvas";

export interface IConnect {
    getBlockIds(): string[];
    getConnectLines(): LineCanvas[];

}