import {LinePartConnect} from "./LinePartConnect";

export class ConnectionBlocks {
    private _connection: LinePartConnect[] | undefined


    constructor(lines: LinePartConnect[]) {
        this._connection = lines
    }

    get connection(): LinePartConnect[] {
        return this._connection!!
    }
}