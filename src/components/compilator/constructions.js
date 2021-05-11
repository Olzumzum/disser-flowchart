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

export const cpp_inic_construction = [
    'int',
    'double'
]

export const cpp_action_operators = [
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

export const cpp_single_line_comment = '//';
export const cpp_multi_line_comment = ['/*', '*/'];
export const cpp_unary_operator = ['++', '--'];
export const cpp_data_in = "cin";
export const cpp_data_out = "cout";
export const cpp_input_construction = {
    start_symb: ">>",
    middle_symb: ">>",
    end_symb: ";"
};
export const cpp_output_construction = {
    start_symb: "<<",
    middle_symb: "<<",
    end_symb: ";"
};
export const cpp_string_symbols = ['"', "'", "`"];

//выбор набора конструкций для ранзых ЯП и ЯК
export function get_language_params(type, lang) {
    //будущий код
    let simple_block_construction;
    let block_construction;
    let block_params;
    let block_end = ';';
    let inic_construction; //типы переменных для конкретного языка
    let action_operators;
    let single_line_comment;
    let multi_line_comment;
    let data_in, data_out;
    let input_construction, output_construction;
    let string_symbols;
    let unary_operator;
    switch (lang) {
        case 'cpp':
            inic_construction = cpp_inic_construction;
            action_operators = cpp_action_operators;
            single_line_comment = cpp_single_line_comment;
            multi_line_comment = cpp_multi_line_comment;
            data_in = cpp_data_in;
            data_out = cpp_data_out;
            input_construction = cpp_input_construction;
            output_construction = cpp_output_construction;
            string_symbols = cpp_string_symbols;
            unary_operator = cpp_unary_operator;
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
        inic_construction: inic_construction,
        action_operators: action_operators,
        single_line_comment: single_line_comment,
        multi_line_comment: multi_line_comment,
        data_in: data_in,
        data_out: data_out,
        input_construction: input_construction,
        output_construction: output_construction,
        string_symbols: string_symbols,
        unary_operator: unary_operator,
    }
    return params;

}

