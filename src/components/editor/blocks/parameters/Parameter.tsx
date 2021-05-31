import {ParameterTypes} from "./ParameterTypes";
import {generateId} from "../factory/CreatorBlock";

export class Parameter {
    private _id: string = ""
    private _variable: string | undefined
    private _value: string | undefined
    private _type: ParameterTypes | undefined

    constructor() {
        this.id = generateId()
    }


    get variable(): string | undefined {
        return this._variable;
    }

    set variable(value: string | undefined) {
        this._variable = value;
    }

    get value(): string | undefined {
        return this._value;
    }

    set value(value: string | undefined) {
        this._value = value;
    }

    get type(): ParameterTypes | undefined {
        return this._type;
    }

    set type(value: ParameterTypes | undefined) {
        this._type = value;
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}