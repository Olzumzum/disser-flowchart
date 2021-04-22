//пакет функций по нахождению блоков ЯК в тексте кода

import {block_params, c_inic_construction, constructions_list} from "./constructions";
import {
    search,
    search_construction,
    search_construction_result,
    search_result
} from "./text_searcher";
import {content_maker, create_block} from "./block_creator";
import {neighbour_block} from "./neigbour";
import {search_inic, search_inic_construction} from "./variables";

//функция нахождения ЯК
export function block_processing(lines, lang) {
    var id = 0;
    var blocks = [];                    //массив из объектов-блоков
    var block;
    var neighbour = false;
    var inner_lvl = -1;              //уровень вложенности
    let content = ''; //УДАЛИТЬ
    for (var line = 0; line < lines.length; line++) { // перебор строк
        //поиск языковых конструкций в строке
        let block = search_inic(lines, line, lang);
        if (block != false) {
            content = content_maker(lines, block);
            id++;

            let type = "action";
           // create_block(id,blocks,lines,line, block, type, true);
        } else if (search_construction_result(lines, line)) { //ЯК найдена
            block = search_inner_construction(lines, line, id, blocks, inner_lvl);
            id = block[3] + 1;
            line = block[1].line;

        }
    }
    return blocks;
}

//основная функция по нахождению ЯК, определению блока и созданию объекта
function search_inner_construction(lines, line, id, blocks, inner_lvl,) {
    var p_bool = false;
    let tmp;
    tmp = search_construction(lines, line);
    inner_lvl++;
    if (inner_lvl == 0)
        p_bool = true;
    var block = search_block(lines, line, tmp, id, blocks, inner_lvl);
    id = block[3];
    create_block(id, blocks, lines, line, block, tmp[1], p_bool);
    block = neighbour_block(lines, block, tmp[1], id, blocks, inner_lvl, p_bool);
    id = block[3] + 1;
    return block;
}


//функция формирования блока ЯК
export function search_block(lines, line, constr_arr, id, blocks, inner_lvl) {
    var inner_constructions_numb = 0; //кол-во вложенных конструкций
    var block_start = {}, block_end = false;

    let type = constr_arr[1];
    let constr_pos = constr_arr[0];
    let params = block_params(type);

    let constr_type = block_type_find(lines, line, params.block_construction, constr_pos); // сложность блока
    block_start = block_start_finder(lines, line, constr_pos, params, constr_type);
    let pos = block_start.pos;
    line = block_start.line;
    //block_end = block_end_finder(lines, line, pos, params, constr_type);
    //определяется окончание блока в тексте
    while (block_end == false) {
        var flag = 1;

        //  while (flag != 0) {
        //   pos = 0;
        if (search_construction_result(lines, line, pos)) {    //если внутри блока использована ЯК
            inner_constructions_numb++;
            var tmp = search_inner_construction(lines, line, id, blocks, inner_lvl);
            pos = tmp[1].pos + 1;
            id = tmp[3] + 1;
            line = tmp[1].line - 1;
        } else
            pos = 0;
        block_end = block_end_finder(lines, line, pos, params, constr_type);
        line++;
        //  }
    }

    return [block_start, block_end, inner_constructions_numb, id, inner_lvl];
}

//возможно, ненужная функция по определению типа блока (с {} / без {})
function block_type_find(lines, line, b_c, constr_pos) {
    let sc = b_c[0];
    let constr_type;
    if (search_result(lines[line], sc, constr_pos)) //после ключевого слова ЯК указывается '{'
        constr_type = 1; //блок начинается на одной строке с ЯК
    else if ((search_result(lines[line + 1], sc) && (search(lines[line + 1], sc) < 1))) { // '{' указывается на следующей строке после ключевого слова
        constr_type = 1; // блок начинается на следующей строке
        line++;
    } else
        constr_type = 2; //блок без {}
    return constr_type;
}


//ПЕРЕПИСАТЬ
//возвращает координаты начала блока
function block_start_finder(lines, line, pos, params, c_t) {
    let block, l, p;
    switch (c_t) {
        case 1:
            if (search_result(lines[line], params.block_construction[0], pos)) {
                l = line;
                p = search(lines[line], params.block_construction[0], pos) + params.block_construction[0].length;
            } else if (search_result(lines[line + 1], params.block_construction[0])) {
                l = line + 1;
                p = search(lines[l], params.block_construction[0]) + params.block_construction[0].length;
            }
            break;
        case 2:
            if (search_result(lines[line], params.block_end, search(lines[line], params.block_params[1], pos))) {
                l = line;
                p = search(lines[line], params.block_params[1]) + 1;
            } else {
                l = line + 1;
                p = 0;
            }

            break;
    }
    block = {
        line: l,
        pos: p
    };
    return block;
}

/*
function block_start_finder(lines, line, pos, params, c_t, w_f) {
    let block, l, p;
    let what_find = w_f;
    switch (c_t) {
        case 1:
            if (search_result(lines[line], w_f, pos)) {
                l = line;
                p = search(lines[line], w_f, pos) + w_f.length;
            } else if (search_result(lines[line + 1], w_f)) {
                l = line + 1;
                p = search(lines[l], w_f) + w_f.length;
            }
            break;
        case 2:
            if (search_result(lines[line], params.block_end, pos)) {
                l = line;
                p = search(lines[line], params.block_params[1]) + 1;
            } else {
                l = line + 1;
                p = 0;
            }

            break;
    }
    block = {
        line: l,
        pos: p
    };
    return block;
}
*/

//ПЕРЕПИСАТЬ
//возвращает координаты конца блока
function block_end_finder(lines, line, pos, params, c_t) {
    //это все костыли, пока не научу прогармму находить все блоки
    let block, l, p, s = params.block_construction[1];
    switch (c_t) {
        case 1:
            if (search_result(lines[line], s, pos)) {
                l = line;
                p = search(lines[line], s, pos) + s.length;
            } else
                return false;
            break;
        case 2:
            //МЕГА КОСТЫЛЬ НА ВРЕМЯ (ПОКА НЕ НАУЧУ НАХОДИТЬ БЛОКИ ОБЪЯВЛЕНИЙ И ОПРЕДЕЛЕНИЙ)
            if (lines[line].length > (search(lines[line], params.block_params[1])) + 1) {
                l = line;
                p = lines[line].length;
            } else {
                l = line + 1;
                p = lines[l].length;
            }
            break;
    }
    block = {
        line: l,
        pos: p
    };
    return block;
}


