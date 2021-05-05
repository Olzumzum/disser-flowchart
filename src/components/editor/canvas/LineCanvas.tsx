/**
 * Связь между блоками
 */
import {generateId} from "../blocks/factory/CreatorBlock";

export class LineCanvas {
    private _x: number = 0;
    private _y: number = 0;
    private _x2: number = 0;
    private _y2: number = 0;

    constructor(x: number,
                y: number,
                width: number,
                height:number) {
        this._x = x;
        this._y = y;
        this._x2 = width;
        this._y2 = height;
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    get x2(): number {
        return this._x2
    }

    get y2(): number {
        return this._y2
    }

}