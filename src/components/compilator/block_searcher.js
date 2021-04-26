//пакет функций по нахождению блоков ЯК в тексте кода

import {get_language_params, c_inic_construction, constructions_list} from "./constructions";
import {
    getCurrentPosition,
    getTextInfo,
    newText,
    search,
    search_construction,
    search_construction_result, search_content,
    search_result, updateCurrentPosition
} from "./text_searcher";
import {content_maker} from "./block_creator";
import {neighbour_block} from "./neigbour";
import {search_init_block, search_init_construction} from "./variables";
import {
    object_block,
    obj_array,
    createBlock,
    getLastBlockInfo,
    updateBlockContent,
    updateBlockInnerStructureNumb
} from "./object_block";
import {arr_list, var_list} from "./var_list";
import {search_action_block} from "./action";


//функция нахождения ЯК
export function block_processing(lines, lang) {
    let inner_lvl = 0;              //уровень вложенности
    let parent_id = -1;
    let neighbour_id = -1;
    let inner_structure_numb = 0; //количество вложенных структур да следующей уровне

    //let block;
    newText(lang, lines);
    let l = getCurrentPosition().line;
    let t = getTextInfo().text.length - 1;
    while (l != t) {
        //let block =

        neighbour_id = search_block(parent_id, neighbour_id, inner_lvl);
        l = getCurrentPosition().line;
        let info = getLastBlockInfo();
        inner_structure_numb++;
        let test = obj_array;
        let t = "t";
    }


    /*
    по завершению создаю объект с парметрами
    inner_lvl = 0;
    либо
        parent_id = id - ссылается сам на себя
    либо
        parent_id = -1
        id = -1
    но это дичь
     */
    let test = obj_array;
    let test2 = var_list;
    let test3 = arr_list;

}

//основная функция по нахождению ЯК, определению блока и созданию объекта
function search_block(p_id, n_id, in_lvl) {

    let block_id;

    let in_str_numb = 0;
    in_lvl++;

    let block = search_init_block(p_id, n_id, in_lvl);
    if (block != false) {
        let test = obj_array;
        block_id = getLastBlockInfo().id;
    } else if (search_construction_result()) { //ЯК найдена
        let block_start;
        let parameter;
        let l = getCurrentPosition();
        let construction = search_construction();
        let params = get_language_params(construction);
        //нужна функция поиска параметров блока ()
        block_start = {
            line: getCurrentPosition().line,
            pos: getCurrentPosition().pos
        }
        if (search_content(params.block_params))
            parameter = content_maker(block_start); //написать функцию поиска параметра
        let comment = ""; //написать функцию по поиску комментария

        createBlock(p_id, n_id, construction, in_lvl, "",
            0, parameter, comment);

        block_id = getLastBlockInfo().id;

        let constr_type = construction_type_find(construction, params);
        block_start_finder(constr_type, params);
        //записал начало блока
        block_start = {
            line: getCurrentPosition().line,
            pos: getCurrentPosition().pos
        }
        do {
            let neighbour_id = getLastBlockInfo().id;
            block = search_block(block_id, neighbour_id, in_lvl);
            in_str_numb++;
        } while (!block_end_finder(constr_type, params))


        let content = content_maker(block_start);

        updateBlockContent(block_id, content);
        updateBlockInnerStructureNumb(block_id, in_str_numb);

    } else {
        block = search_action_block(p_id, n_id, in_lvl);
        if (block != false)
            block_id = getLastBlockInfo().id;
        else {
            updateCurrentPosition(0, getCurrentPosition().line + 1);
            block_id = search_block(p_id, n_id, in_lvl - 1);
        }
    }

    //удалить в финальной версии
    let test1 = getCurrentPosition();
    let test2 = var_list;
    let test3 = arr_list;
    let test = obj_array;
    return block_id;
}

//возможно, ненужная функция по определению типа блока (с {} / без {})
function construction_type_find(construction, params) {
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    let lines = t_i.text;
    let line = c_p.line;
    let sc = params.block_construction[0];
    let constr_type;

    if (search_result(lines[line], sc, getCurrentPosition())) //после ключевого слова ЯК указывается '{'
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
function block_start_finder(c_t, params) {
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    let lines = t_i.text;
    let line = c_p.line;
    let pos = c_p.pos;
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
            return;
            break;
    }
    updateCurrentPosition(p, l);
}


function block_end_finder(c_t, params) {
    //это все костыли, пока не научу прогармму находить все блоки
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    let lines = t_i.text;
    let line = c_p.line;
    let pos = c_p.pos;
    let l, p, s = params.block_construction[1];
    switch (c_t) {
        case 1:
            if (search_result(lines[line], s, pos)) {
                l = line;
                p = search(lines[line], s, pos) + s.length;
            } else
                return false;
            break;
        case 2:
            return true;
            break;
    }
    updateCurrentPosition(p, l);

    return true;
}


