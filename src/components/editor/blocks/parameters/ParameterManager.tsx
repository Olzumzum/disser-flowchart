import {ParametersKeeper} from "./ParametersKeeper";
import {Parameter} from "./Parameter";

export class ParameterManager {
    private _parameterMass: Array<ParametersKeeper> | undefined

    constructor() {
        this._parameterMass = new Array<ParametersKeeper>()
    }

    getParameter(id: string) : Array<Parameter> | undefined{
        let parameters: Array<Parameter> | undefined
        this._parameterMass?.forEach(par => {
            if(!par.id.localeCompare(id))
                parameters = par.parameters
        })
        return parameters
    }
}