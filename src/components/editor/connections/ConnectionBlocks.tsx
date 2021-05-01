import {LinePartConnect} from "./LinePartConnect";
import {generateId} from "../blocks/factory/CreatorBlock";

export class ConnectionBlocks {
    private _id: string = ""
    private _connection: LinePartConnect[] | undefined

    //массив из двух строк, каждая из строк - id связываемых блоков
    private _blockIds: string[] | undefined

    constructor(lines: LinePartConnect[], idOneBlock: string, idTwoBlock: string) {
        this._connection = lines
        this._id = generateId()
        this._blockIds = [idOneBlock, idTwoBlock]
    }

    get connection(): LinePartConnect[] {
        return this._connection!!
    }

    get blockIds(): string[] | undefined {
        return this._blockIds
    }

    set blockIds(ids: string[] | undefined){
        this._blockIds = ids
    }
}