import {LineCanvas} from "../../../canvas/LineCanvas";
import {generateId} from "../../factory/CreatorBlock";
import {IConnect} from "./IConnect";

export class ConnectionBlocks implements IConnect{
    private _id: string = ""
    private _connectLines: LineCanvas[] | undefined

    //массив из двух строк, каждая из строк - id связываемых блоков
    private _blockIds: string[] | undefined

    constructor(lines: LineCanvas[], idOneBlock: string, idTwoBlock: string) {
        this._connectLines = lines
        this._id = generateId()
        this._blockIds = [idOneBlock, idTwoBlock]
    }

    getConnectLines(): LineCanvas[] {
        return this._connectLines!!
    }

    getBlockIds(): string[]{
        return this._blockIds!!
    }

    set blockIds(ids: string[] | undefined){
        this._blockIds = ids
    }
}