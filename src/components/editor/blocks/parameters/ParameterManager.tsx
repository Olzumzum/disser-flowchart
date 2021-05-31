import {Parameter} from "./Parameter";
import {ParameterTypes} from "./ParameterTypes";

export class ParameterManager {
    private _parameterMass: Array<Parameter> | undefined

    constructor() {
        this._parameterMass = new Array<Parameter>()
    }

    createParameter(): string{
        const par = new Parameter()
        return par.id
    }


    setParameter(id: string,variable: string, value: string, type: ParameterTypes){
        const param = this.searchParameter(id)
        if(param !== undefined){
            param.variable = variable
            param.value = value
            param.type = type
        }
    }

    searchParameter(id: string): Parameter | undefined{
        let result: Parameter | undefined
        this._parameterMass?.forEach(param => {
            if(!param.id.localeCompare(id))
                result =  param
        })
        return result
    }
}