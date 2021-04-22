//пакет функций по нахождению блоков операций над переменными и вводом/выводом данных

import {get_language_params} from "./constructions";
import {search, search_result} from "./text_searcher";
import {obj_array, object_block} from "./object_block";
import {arr_list, var_list} from "./var_list";
import {content_maker} from "./block_creator";


export function search_action_block(lines, line, lang){
    let content;
    let  neighbour_id = -1, in_lvl = -1;
    let block = search_action_construction(lines, line, lang);
    if (block != false) {
        content = content_maker(lines, block);

        obj_array[obj_array.length] = object_block(
            obj_array.length,
            -1,
            neighbour_id,
            "prisvoation",
            in_lvl,
            content,
            -1,
            block[2],
            false,
            "");


    }
    return block;
}

export function search_action_construction(lines, line, lang, l) {
    let test = obj_array;
    let test2 = var_list;
    let test3 = arr_list;
    let block_start, block_end;
    var start_pos, end_pos;
    let params = get_language_params('', lang);
    let operator_list = params.action_operators;
    let b_e = params.block_end;
    let type;
    if (typeof l !== "undefined") {
        for (let i = 0; i < operator_list.length; i++) {
            if (search_result(lines[line], operator_list[i], l)) {
                for(let j = 0; j <var_list.length; j++)
                    if (search_result(lines[line],var_list[j].name, l)) {
                        if (search(lines[line], var_list[j].name, l) < search(lines[line], operator_list[i],l)) {
                            start_pos = search(lines[line], var_list[j].name, l);
                            type = var_list[j].type;
                            break;
                        }
                    } else if (search_result(lines[line],arr_list[j].name + '[', l))
                        if (search(lines[line],arr_list[j].name + '[', l) < search(lines[line],operator_list[i],l)) {
                            start_pos = search(lines[line], arr_list[j].name + '[', l);
                            type = arr_list[j].type;
                            break;
                        }
                break;
            } else if (i == operator_list.length - 1)
                return false;
        }
    } else {
        for (let i = 0; i < operator_list.length; i++) {
            if (search_result(lines[line], operator_list[i])) {
                for(let j = 0; j <var_list.length; j++)
                    if (search_result(lines[line],var_list[j].name)) {
                        if (search(lines[line], var_list[j].name) < search(lines[line], operator_list[i])) {
                            start_pos = search(lines[line], var_list[j].name);
                            break;
                        }
                    } else if (search_result(lines[line],arr_list[j].name))
                        if (search(lines[line],arr_list[j].name) < search(lines[line],operator_list[i])) {
                            start_pos = search(lines[line], arr_list[j].name);
                            break;
                        }
                break;
            } else if (i == operator_list.length - 1)
                return false;
        }
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
    return [block_start, block_end, type];
}
