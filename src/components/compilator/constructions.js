export const constructions_list = [
    'while',
    'for',
    'do',
    'if',
    'else',
    'switch',
    'case',
    'break',
    'default',
    'return'
]

export const c_inic_construction = [
    'int',
    'double'
]

export const c_action_operators = [
    '=',
    '+=',
    '-=',
    '*=',
    '/=',
    '%=',
    '&=',
    '|=',
    '^=',
    '>>=',
    '<<='
]

//выбор набора конструкций для ранзых ЯП и ЯК
export function get_language_params(type, lang) {
    //будущий код
    let simple_block_construction;
    let block_construction;
    let block_params;
    let block_end = ';';
    let iniz_construction; //типы переменных для конкретного языка
    let action_operators;

    switch (lang) {
        case 'c':
            iniz_construction = c_inic_construction;
            action_operators = c_action_operators;
            break;
        default:
            break;
    }

    switch (type) {
        case 'case':
            block_params = ':';
           // block_construction = [' ', ':'];
            block_construction = ['{', '}']; //заменить
            break;
        case 'default':
            block_params = ':';
            // block_construction = [' ', ':'];
            block_construction = ['{', '}']; //заменить
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
        inic_construction: iniz_construction,
        action_operators: action_operators,
    }
    return params;

}

