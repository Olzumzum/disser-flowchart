import {generateId} from "../factory/CreatorBlock";

export class Comment {
    private _id: string = ""
    private _comment: string | undefined

    constructor() {
        this.id = generateId()
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get comment(): string | undefined {
        return this._comment;
    }

    set comment(value: string | undefined) {
        this._comment = value;
    }
}