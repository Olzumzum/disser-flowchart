//функция нахождения объявления, определения переменных
import {get_language_params} from "./constructions";
import {
    getCurrentComment,
    getCurrentPosition,
    getTextInfo,
    search,
    search_result, string_check,
    updateCurrentPosition
} from "./text_searcher";
import {content_maker} from "./block_creator";
import {arr_list, newArr, newVar, post_action, pre_action, var_list} from "./var_list"
import {object_block, obj_array, create, getLastBlockInfo} from "./object_block";


export function search_init_block(p_id, n_id, in_lvl) {

    let block = search_init_construction();
    if (block != false) {
        let content = content_maker(block[0]);
        variables_searcher(content, block[1], p_id, n_id, in_lvl);
    }
    return block;
}

//возвращает позиции начала и конца блока объявления переменных

//находит координаты начала и конца объявления переменных / функций - возвращает тип данных
export function search_init_construction() {
    let block_start, block_end;
    var start_pos, end_pos;


    let lines = getTextInfo().text;
    let line = getCurrentPosition().line;
    let pos = getCurrentPosition().pos;

    let params = get_language_params('', getTextInfo().lang);
    let i_c = params.inic_construction;
    let b_e = params.block_end;         //конструкция, обозначающая конец блока


    for (var i = 0; i < i_c.length; i++) {
        if (search_result(lines[line], i_c[i], pos)) {
            start_pos = search(lines[line], i_c[i]);
            end_pos = start_pos + i_c[i].length;
            break;
        } else if (i == i_c.length - 1)
            return false;
    }


    block_start = {
        line: line,
        pos: start_pos + i_c[i].length
    };

    while (search_result(lines[line], b_e) != true)
        line++;


    if (block_start.line == line)
        end_pos = search(lines[line], b_e, block_start.pos) + 1;
    else
        end_pos = search(lines[line], b_e) + 1;

    block_end = {
        line: line,
        pos: end_pos
    };
    updateCurrentPosition(end_pos, line);
    return [block_start, i_c[i]];
}

//основная функция по нахождению объявления, определению переменных и созданию объекта
function variables_searcher(text, type, p_id, n_id, in_lvl) {

    let variable;
    let pos = 0, pos_equal = -1, pos_dat = -1, pos_s = 0;
    let block;
    let comm = getCurrentComment();

    //ПЕРЕСМОТРЕТЬ
    while (pos != text.length) {
        if (search_result(text, '=', pos))
            pos_equal = search(text, '=', pos) + 1;
        else
            pos_equal = text.length + 1;
        if (search_result(text, ',', pos))
            while (search_result(text, ',', pos)) {
                if (dat_check(text, search(text, ',', pos))) {
                    pos_dat = search(text, ',', pos);
                    pos = pos_dat + 1;
                    break;
                } else if (search_result(text, ',', pos + 1))
                    pos = search(text, ',', pos + 1);
                else {
                    pos = text.length;
                    pos_dat = pos;
                }
            }
        else {
            pos = text.length;
            pos_dat = search(text, get_language_params('', getTextInfo().lang).block_end, getCurrentPosition().pos);
        }
        if (pos_equal < pos_dat) {
            //определение переменной
            block = equal_finder(text, pos_equal, pos_dat, pos_s);
            variable = text.substring(block[0].start, block[0].end);
            variable = variable.replaceAll(" ", "");
            if (!search_result(variable, '[')) { //если не массив
                var_list.push(newVar(variable, type));
                var_list.sort(function (a,b){
                    return b.name.length - a.name.length;
                })
            } else {
                let size = variable.substring(search(variable, '['), variable.length);
                variable = variable.substring(0, search(variable, '['));
                arr_list.push(newArr(variable, type, size));
            }

            let equal = search_unary_operator(text.substring(block[1].start, block[1].end));

            //ТУТ ВСТАВИТЬ ФУНКЦИЮ create_content()
            let content = variable + " = " + equal;

            //создание объекта блока инициализации переменной
            create(p_id, n_id, "initializing", in_lvl, content, 0, type, getCurrentComment());
        } else {
            variable = text.substring(pos_s, pos_dat);
            var_list.push(newVar(variable, type));

            //создание объекта блока инициализации переменной
            create(p_id, n_id, "declaring", in_lvl, variable, 0, type, getCurrentComment());
            let t = obj_array;
            let t2 = "";
        }
        pos_s = pos_dat + 1;
        n_id = getLastBlockInfo().id;
    }
}

//возвращает значение, присваеваемое переменной
function equal_finder(text, pos_s, pos_e, pos) {
    //ДОБАВИТЬ ПОДГРУЗКУ ПАРАМЕТРОВ
    let start_eq, end_eq = -1;
    let s_c = [['{', '}'], ['"', '"'], ["'", "'"], ['`', '`']];

    for (let i = 0; i < s_c.length; i++)
        if (search_result(text, s_c[i][0], pos_s)) {
            start_eq = search(text, s_c[i][0], pos_s);
            if (start_eq < pos_e) {
                end_eq = search(text, s_c[i][1], pos_s) + 1;
                break;
            }
        }


    if (end_eq == -1) {
        start_eq = pos_s;
        if (dat_check(text, pos_e)) {
            end_eq = pos_e;
        } else if (search_result(text, ',', pos_e + 1))
            end_eq = search(text, ',', pos_e + 1);
        else
            end_eq = search(text, ';', pos_e + 1);
    }

    let eq_block = {
        start: start_eq,
        end: end_eq,
    };
    let var_name = {
        start: pos,
        end: start_eq - 1
    }
    return [var_name, eq_block];
}

/*возвращает true если запятая является разделителем при объявлении переменных
возвращает false если запятая является плавующей при определении переменной*/
function dat_check(text, pos) {
    let dat_pos = search(text, ',', pos);
    let symb1 = text.substring(dat_pos - 1, dat_pos);
    let symb2 = text.substring(dat_pos + 1, dat_pos + 2);

    let s1 = parseInt(symb1);
    let s2 = parseInt(symb2);

    if ((!isNaN(s1)) && (!isNaN(s2)))
        return false;
    else
        return true;
}

//функция нахождения унарных операций
export function search_unary_operator(text) {
    //можно добавить функцию удаления пробела из строки, чтобы находить конструкции типа test ++
    let test = var_list;
    let operators = get_language_params('', getTextInfo().lang).unary_operator;
    for (let i = 0; i < operators.length; i++) {
        let oper_pos = search(text, operators[i]);
        while (oper_pos != -1) {
            if (!string_check(operators[i], text, oper_pos)) {
                for (let j = 0; j < var_list.length; j++) {
                    let test_var = var_list[j].name
                    let var_pos = search(text, var_list[j].name);
                    while (var_pos != -1) {
                        if (!string_check(var_list[j].name, text, var_pos)) {
                            if(var_pos == oper_pos + operators[i].length) {
                                let content = var_list[j].name + " = " + var_list[j].name+ " ";
                                if (operators[i].length > 1)
                                    content += operators[i].substring(0, 1) + " 1" + get_language_params("", getTextInfo().lang).block_end;
                                pre_action.push(operators[i] + "" + var_list[j].name);
                                text = text.replaceAll(operators[i] + "" + var_list[j].name, var_list[j].name);
                            }
                            else if (oper_pos == var_pos + var_list[j].name.length) {
                                let content = var_list[j].name + " = " + var_list[j].name + " ";
                                if (operators[i].length > 1)
                                    content += operators[i].substring(0, 1) + " 1" + get_language_params("", getTextInfo().lang).block_end;
                                post_action.push(content);
                                text = text.replaceAll(var_list[j].name + "" + operators[i], var_list[j].name);
                            }
                        }
                        var_pos = search(text, var_list[j], var_pos+var_list[j].name.length);
                    }
                }
            }
            //здесь можно добавить цикл на поиск элементов массива
            oper_pos = search(text, operators[i], oper_pos + operators[i].length);
        }
    }
    return text;
}

