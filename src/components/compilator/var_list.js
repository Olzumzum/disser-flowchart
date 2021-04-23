export const var_list = [];

export function newVar(name, type){
    return{
        name,
        type
    };
}

export const arr_list = [];

export function newArr(name, type, size){
    return{
        name,
        type,
        size
    };
}