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

export const function_list = [];

export function newFunction(name, type){
    return{
        name,
        type
    };
}
export const pre_action = [];
export const post_action = [];