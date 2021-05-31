import {ParameterTypes} from "./ParameterTypes";
import {generateId} from "../factory/CreatorBlock";

/**
 * Переменная-параметр
 */
export class Parameter {
    private _id: string = ""
    //имя переменной
    private _variable: string | undefined
    //значение переменной
    private _value: string | undefined
    //тип переменной
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