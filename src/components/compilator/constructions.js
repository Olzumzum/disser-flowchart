export const constructions_list = [
    'while',
    'for',
    'if',
    'else',
    'switch'
]

export const c_inic_construction = [
    'int',
    'double'
]

//выбор набора конструкций для ранзых ЯП и ЯК
export function block_params(type, lang) {
    //будущий код
    let simple_block_construction;
    let block_construction;
    let block_params;
    let block_end = ';';
    let inic_construction;
    switch (lang) {
        case 'c':
            inic_construction = c_inic_construction;
            break;
        default:
            break;
    }

    switch (type) {
        case 'case':
            block_params = [':', 'break'];
            block_construction = [' ', ':'];
            break;
        default:
            block_params = ['(', ')'];
            block_construction = ['{', '}'];
            break;

    }
    let params = {
        block_construction: block_construction,
        block_params: block_params,
        block_end: block_end,
        inic_construction: inic_construction,
    }
    return params;

}

