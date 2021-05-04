/**
 * Связь между блоками
 */
import {generateId} from "../blocks/factory/CreatorBlock";

export class LineCanvas {
    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 0;
    private _height: number = 0;

    constructor(x: number,
                y: number,
                width: number,
                height:number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    get width(): number {
        return this._width
    }

    get height(): number {
        return this._height
    }

}