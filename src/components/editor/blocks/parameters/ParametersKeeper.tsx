import {Parameter} from "./Parameter";
import {generateId} from "../factory/CreatorBlock";
import {ParameterTypes} from "./ParameterTypes";

export class ParametersKeeper {
    private _id: string = ""
    private _parameters: Array<Parameter> | undefined

    constructor() {
        this._id = generateId()
        this._parameters = new Array<Parameter>()
    }


    addParameter(variable: string, value: string, type: ParameterTypes){
        this._parameters?.push(new Parameter(variable, value, type))
    }

    get parameters(): Array<Parameter> | undefined {
        return this._parameters;
    }

    get id(): string {
        return this._id;
    }
}