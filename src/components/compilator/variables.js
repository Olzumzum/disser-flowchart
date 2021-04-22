//функция нахождения объявления, определения переменных
import {get_language_params} from "./constructions";
import {search, search_result} from "./text_searcher";
import {content_maker, create_block} from "./block_creator";
import {arr_list, newArr, newVar, var_list} from "./var_list"
import {object_block, obj_array} from "./object_block";


export function search_iniz_block(lines, line, lang) {
    let content;
    let block = search_iniz_construction(lines, line, lang);
    if (block != false) {
        content = content_maker(lines, block);
        variables_searcher(content, block);
    }
    return block;
}

//возвращает позиции начала и конца блока объявления переменных

//L чисто для подстраховки, при ненадобности - удалить
export function search_iniz_construction(lines, line, lang, l) {
    let block_start, block_end;
    var start_pos, end_pos;
    let params = get_language_params('', lang);
    let i_c = params.inic_construction;
    let b_e = params.block_end;         //конструкция, обозначающая конец блока
    if (typeof l !== "undefined") {
        for (var i = 0; i < i_c.length; i++) {
            if (search_result(lines[line], i_c[i], l)) {
                start_pos = search(lines[line], i_c[i]);
                break;
            } else if (i == i_c.length - 1)
                return false;
        }
    } else {
        for (var i = 0; i < i_c.length; i++) {
            if (search_result(lines[line], i_c[i])) {
                start_pos = search(lines[line], i_c[i]);
                end_pos = start_pos + i_c[i].length;
                break;
            } else if (i == i_c.length - 1)
                return false;
        }
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
    return [block_start, block_end, i_c[i]];
}

//основная функция по нахождению объявления, определению переменных и созданию объекта


function variables_searcher(text, bl, in_lvl) {

    let variable;
    let pos = 0, pos_equal = -1, pos_dat = -1, pos_s = 0;
    let block;
    let neighbour_id = -1;
    let type = bl[2];

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
            pos_dat = pos - 1;
        }
        if (pos_equal < pos_dat) {
            //определение переменной
            block = equal_finder(text, pos_equal, pos_dat, pos_s);
            variable = text.substring(block[0].start, block[0].end);
            if (!search_result(variable, '[')) { //если не массив
                var_list.push(newVar(variable, type));
            } else {
                let size = variable.substring(search(variable, '['), variable.length);
                variable = variable.substring(0, search(variable, '['));
                arr_list.push(newArr(variable, type, size));
            }


            obj_array[obj_array.length] = object_block(
                obj_array.length,
                -1,
                neighbour_id,
                "initializing",
                in_lvl,
                text.substring(block[0].start, block[1].end),
                -1,
                bl[2],
                false,
                "");

        } else {
            variable = text.substring(pos_s, pos_dat);
            var_list.push(newVar(variable, type));
            let arr = obj_array; //после отладки удалить
            obj_array[obj_array.length] = object_block(
                obj_array.length,
                -1,
                neighbour_id,
                "declaring",
                in_lvl,
                text.substring(pos_s, pos_dat),
                -1,
                bl[2],
                false,
                "");

        }
        neighbour_id = obj_array.length - 1;
        pos_s = pos_dat + 1;
    }
}

//возвращает значение, присваеваемое переменной
function equal_finder(text, pos_s, pos_e, pos) {
    let start_eq, end_eq;
    let s_c = [['{', '}'], ['"', '"'], ["'", "'"], ['`', '`']];

    for (let i = 0; i < s_c.length; i++)
        if (search_result(text, s_c[i][0], pos_s)) {
            start_eq = search(text, s_c[i][0], pos_s);
            if (start_eq < pos_e)
                end_eq = search(text, s_c[i][1], pos_s) + 1;
            else {
                start_eq = pos_s;
                if (dat_check(text, pos_e)) {
                    end_eq = pos_e;
                } else if (search_result(text, ',', pos_e + 1))
                    end_eq = search(text, ',', pos_e + 1);
                else
                    end_eq = search(text, ';', pos_e + 1);
            }
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