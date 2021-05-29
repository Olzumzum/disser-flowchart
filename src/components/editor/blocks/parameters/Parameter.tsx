import {ParameterTypes} from "./ParameterTypes";

export class Parameter {
    private _variable: string | undefined
    private _value: string | undefined
    private _type: ParameterTypes | undefined

    constructor(variable: string, value: string, type: ParameterTypes) {
        this._variable = variable
        this._value = value
        this._type = type
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
}