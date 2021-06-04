import {getTextInfo} from "./text_searcher";




export const cpp_params = {
    inic_construction : [
        'void',
        'int',
        'double'
    ],
    action_operators : [
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
    ],
    single_line_comment : '//',
    multi_line_comment : ['/*', '*/'],
    data_in : "cin",
    data_out : "cout",
    input_construction : {
        start_symb: ">>",
        middle_symb: ">>",
        end_symb: ";"
    },
    output_construction : {
        start_symb: "<<",
        middle_symb: "<<",
        end_symb: ";"
    },
    string_symbols : ['"', "'", "`"],
    unary_operator : ['++', '--'],
    for_each_symbol : ":",
    integer_declaring : "int",
    constructions_list: [
        'while',
        'for',
        'do',
        'if',
        'else',
        'switch',
        'case',
        'default',
        'break',
        'return',
        'continue'
    ],

}

export const js_params = {
    inic_construction : [
        'let'
    ],
    action_operators : [
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
    ],
    single_line_comment : '//',
    multi_line_comment : ['/*', '*/'],
    data_in : "prompt",
    data_out : "alert",
    input_construction : {
        start_symb: "(",
        middle_symb: "~~~",
        end_symb: ")"
    },
    output_construction : {
        start_symb: "(",
        middle_symb: "+",
        end_symb: ")"
    },
    string_symbols : ['"', "'", "`"],
    unary_operator : ['++', '--'],
    for_each_symbol : ":",
    integer_declaring : "int",
    constructions_list: [
        'while',
        'for',
        'do',
        'if',
        'else',
        'switch',
        'case',
        'default',
        'break',
        'return',
        'continue'
    ],

}

export const constructions_list = [
    'while',
    'for',
    'do',
    'else',
    'if',
    'switch',
    'case',
    'default',
    'break',
    'return',
    'function',
]

export const cpp_inic_construction = [
    'void',
    'int',
    'double',
    'string'
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
export const cpp_for_each_symbol = ":";
export const cpp_string_symbols = ['"', "'", "`"];
export const cpp_integer_declaring = "int";

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
    let for_each_symbol;
    let integer_declaring;
    switch (lang) {
        case 'cpp':
            inic_construction = cpp_params.inic_construction;
            action_operators = cpp_params.action_operators;
            single_line_comment = cpp_params.single_line_comment;
            multi_line_comment = cpp_params.multi_line_comment;
            data_in = cpp_params.data_in;
            data_out = cpp_params.data_out;
            input_construction = cpp_params.input_construction;
            output_construction = cpp_params.output_construction;
            string_symbols = cpp_params.string_symbols;
            unary_operator = cpp_params.unary_operator;
            for_each_symbol = cpp_params.for_each_symbol;
            integer_declaring = cpp_params.integer_declaring;
            break;
        case 'js':
            inic_construction = js_params.inic_construction;
            action_operators = js_params.action_operators;
            single_line_comment = js_params.single_line_comment;
            multi_line_comment = js_params.multi_line_comment;
            data_in = js_params.data_in;
            data_out = js_params.data_out;
            input_construction = js_params.input_construction;
            output_construction = js_params.output_construction;
            string_symbols = js_params.string_symbols;
            unary_operator = js_params.unary_operator;
            for_each_symbol = js_params.for_each_symbol;
            integer_declaring = js_params.integer_declaring;
            break;
        default:
            break;
    }

    switch (type) {
        case 'case':
            block_params = ':';
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
        for_each_symbol: for_each_symbol,
        integer_declaring: integer_declaring,
    }
    return params;

}

export function get_array_size(array){
    switch (getTextInfo().lang){
        case "cpp":
            return "sizeof(" + array +") / sizeof(" + array + "[0] )";

            break;
    }
}