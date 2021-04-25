//пакет функций по нахождению блоков операций над переменными и вводом/выводом данных

import {get_language_params} from "./constructions";
import {getCurrentPosition, getTextInfo, search, search_result, updateCurrentPosition} from "./text_searcher";
import {createBlock, obj_array, object_block} from "./object_block";
import {arr_list, var_list} from "./var_list";
import {content_maker} from "./block_creator";


export function search_action_block(p_id, n_id, in_lvl) {
    let content;
    let block = search_action_construction();
    if (block != false) {
        content = content_maker(block[0]);
        let comment = "";
        let type = block[1];
        createBlock(p_id, n_id, "prisvoation", in_lvl, content,
            0, type, comment);
        return type;
    } else return false;
}

//вохзвращает тип переменной над которой проводится операция
export function search_action_construction() {
    let test = obj_array;
    let test2 = var_list;
    let test3 = arr_list;
    let block_start, block_end;
    let start_pos, end_pos;
    let t_i = getTextInfo();
    let lines = t_i.text;
    let c_p = getCurrentPosition();
    let line = c_p.line;
    let l = c_p.pos;
    let params = get_language_params('', t_i.lang);
    let operator_list = params.action_operators;
    let b_e = params.block_end;
    let type;
    for (let i = 0; i < operator_list.length; i++) {
        if (search_result(lines[line], operator_list[i], l)) {
            for (let j = 0; j < var_list.length; j++)
                if (search_result(lines[line], var_list[j].name, l)) {
                    if (search(lines[line], var_list[j].name, l) < search(lines[line], operator_list[i], l)) {
                        start_pos = search(lines[line], var_list[j].name, l);
                        type = var_list[j].type;
                        break;
                    }
                } else if (arr_list.length != 0)
                    if (search_result(lines[line], arr_list[j].name + '[', l))
                        if (search(lines[line], arr_list[j].name + '[', l) < search(lines[line], operator_list[i], l)) {
                            start_pos = search(lines[line], arr_list[j].name + '[', l);
                            type = arr_list[j].type;
                            break;
                        }
            break;
        } else if (i == operator_list.length - 1)
            return false;
    }


    block_start = {
        line: line,
        pos: start_pos
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
    return [block_start, type];
}
