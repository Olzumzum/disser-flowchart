import {Parameter} from "./Parameter";
import {ParameterTypes} from "./ParameterTypes";

/**
 * Хранилище всех переменных-параметров на панели редактирование.
 * Содержит все основные методы по работе с параметрами
 */
export class ParameterManager {
    //список всех имеющихся в системе параметров
    private _parameterMass: Array<Parameter> | undefined

    constructor() {
        this._parameterMass = new Array<Parameter>()
    }

    /**
     * Создать новый параметр
     */
    createParameter(): string{
        const par = new Parameter()
        this._parameterMass?.push(par)
        return par.id
    }

    /**
     * Задать значение параметра по идентификатору
     * @param id
     * @param variable - имя переменной-параметра
     * @param value - значение параметра
     * @param type - тип перемеенной
     */
    setParameter(id: string,variable: string, value: string, type: ParameterTypes){
        const param = this.getParameter(id)
        if(param !== undefined){
            param.variable = variable
            param.value = value
            param.type = type
        }
    }

    /**
     * Получить параметр по идентификатору
     * @param id
     */
    getParameter(id: string): Parameter | undefined{
        let result: Parameter | undefined
        this._parameterMass?.forEach(param => {
            if(!param.id.localeCompare(id))
                result =  param
        })
        return result
    }
}