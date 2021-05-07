//пакет функций по нахождению блоков ЯК в тексте кода

import {get_language_params, c_inic_construction, constructions_list} from "./constructions";
import {
    getCurrentComment,
    getCurrentPosition,
    getTextInfo, in_out_block_param,
    newText,
    search, search_comment,
    search_construction,
    search_construction_result, search_content, search_in_out_result,
    search_result, updateCurrentComment, updateCurrentPosition
} from "./text_searcher";
import {content_maker, CreateBlockContent} from "./block_creator";
import {search_init_block, search_init_construction} from "./variables";
import {
    object_block,
    obj_array,
    createBlock,
    getLastBlockInfo,
    updateBlockContent,
    updateBlockInnerStructureNumb, updateBlockParameter, getNeighbourBlockId
} from "./object_block";
import {arr_list, var_list} from "./var_list";
import {search_action_block} from "./action";


//функция нахождения ЯК
export function block_processing(lines, lang) {
    let inner_lvl = 0;              //уровень вложенности
    let parent_id = -1;
    let neighbour_id = -1;
    let inner_structure_numb = 0; //количество вложенных структур да следующей уровне


    let ttttt = 3;

    alert (ttttt++);

    alert(ttttt++);

    ttttt = 3;

    alert(++ttttt);
    alert(++ttttt);

    alert("tttt = " + ttttt);

    //let block;
    newText(lang, lines);
    let l = getCurrentPosition().line;
    let p = 0;
    let t = getTextInfo().text.length - 1;
    let t_p = getTextInfo().text[t].length;
    do{
        //let block =

        do
            neighbour_id = search_block(parent_id, neighbour_id, inner_lvl);
        while (neighbour_id == false)
        l = getCurrentPosition().line;
        let info = getLastBlockInfo();

        let otladka = getCurrentPosition();

        inner_structure_numb++;
        let test = obj_array;
        let testsss = "t";
    }while (l < t)


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


    let otladka = getCurrentPosition();
    let block_id = false;

    let params = get_language_params('', getTextInfo().lang);
    updateCurrentComment(search_comment(params));
    let comcheck = getCurrentComment();

    let in_str_numb = 0;
    in_lvl++;

    while (block_id == false) {
        let block = search_init_block(p_id, n_id, in_lvl);  //Поиск инициализации и объявления
        if (block != false) {
            block_id = getLastBlockInfo().id;
        } else if (search_construction_result()) { //если найден ЯК
            block_id = switch_block_construction(p_id, n_id, in_lvl);
        } else {
            let type = search_in_out_result();
            if (type != false) {
                in_out_block_param(type, p_id, n_id, in_lvl);
                block_id = getLastBlockInfo().id;


            } else {
                block = search_action_block(p_id, n_id, in_lvl); //Поиск операции над переменными
                if (block != false)
                    block_id = getLastBlockInfo().id;
                else {
                    let t11 = getCurrentPosition().line;
                    let t22 = getTextInfo().text.length;
                    if (getCurrentPosition().line != getTextInfo().text.length - 1) {
                        updateCurrentPosition(0, getCurrentPosition().line + 1);
                        return false;
                    } else
                        return false;
                }
            }
        }
    }
    //удалить в финальной версии
    let otladka1 = getCurrentPosition();
    let test2 = var_list;
    let test3 = arr_list;
    let test = obj_array;
    return block_id;
}


function switch_block_construction(p_id, n_id, in_lvl) {
    let block_start;
    let parameter, parameter_flag = false, parameter_construction;
    let block_id;
    let construction = search_construction();
    let params = get_language_params(construction);
    let constr_type;
    let in_str_numb = 0;
    let content = "";
    let comment = ""; //написать функцию по поиску комментария
    block_start = {
        line: getCurrentPosition().line,
        pos: getCurrentPosition().pos
    }

    switch (construction) {
        case 'else':
            parameter = "";
            constr_type = construction_type_find(construction, params);
            block_start_finder(constr_type, params);
            break;
        case 'do':
            parameter_flag = true;
            constr_type = construction_type_find(construction, params);
            block_start_finder(constr_type, params);
            break;
        case 'case':
            constr_type = 3;
            if (search_result(getTextInfo().text[getCurrentPosition().line], params.block_params, getCurrentPosition().pos)) {
                updateCurrentPosition(search(getTextInfo().text[getCurrentPosition().line], params.block_params, getCurrentPosition().pos));
                parameter = content_maker(block_start); //написать функцию поиска параметра
                updateCurrentPosition(getCurrentPosition().pos + 1);
            }
            break;
        case "default":
            constr_type = 3;
            if (search_result(getTextInfo().text[getCurrentPosition().line], params.block_params, getCurrentPosition().pos)) {
                updateCurrentPosition(search(getTextInfo().text[getCurrentPosition().line], params.block_params, getCurrentPosition().pos));
                parameter = content_maker(block_start); //написать функцию поиска параметра
                updateCurrentPosition(getCurrentPosition().pos + 1);
            }
            break;
        case 'return':
            if (search_result(getTextInfo().text[getCurrentPosition().line], params.block_end, getCurrentPosition().pos)) {
                updateCurrentPosition(search(getTextInfo().text[getCurrentPosition().line], params.block_end, getCurrentPosition().pos));
                content = content_maker(block_start); //написать функцию поиска параметра
            }
            createBlock(p_id, n_id, construction, in_lvl, content,
                0, "", getCurrentComment());
            updateCurrentPosition(getCurrentPosition().pos + 1);
            return block_id;
        case 'break':

            if (search_result(getTextInfo().text[getCurrentPosition().line], params.block_end, getCurrentPosition().pos))
                updateCurrentPosition(search(getTextInfo().text[getCurrentPosition().line], params.block_end, getCurrentPosition().pos) + params.block_end.length);
            createBlock(p_id, n_id, construction, in_lvl, "",
                0, "", getCurrentPosition());
            return block_id;
        default:
            if (search_content(params.block_params))
                parameter = content_maker(block_start); //написать функцию поиска параметра
            constr_type = construction_type_find(construction, params);
            block_start_finder(constr_type, params);
            break;
    }

    createBlock(p_id, n_id, construction, in_lvl, "",
        0, parameter, getCurrentComment());
    block_id = getLastBlockInfo().id;
    let neighbour_id = block_id;

    block_start = {
        line: getCurrentPosition().line,
        pos: getCurrentPosition().pos
    };

    do {

        let block = search_block(block_id, neighbour_id, in_lvl);
        if (block != false) {
            in_str_numb++;
            neighbour_id = getNeighbourBlockId(block_id, in_lvl + 1);
        }
    } while (!block_end_finder(constr_type, params, block_id))

    content = CreateBlockContent(block_start, constr_type);

    if (parameter_flag) {
        parameter_construction = "while";
        let while_pos = search(getTextInfo().text[getCurrentPosition().line], parameter_construction, getCurrentPosition().pos);
        if (while_pos != -1) {
            block_start = {
                line: getCurrentPosition().line,
                pos: while_pos + parameter_construction.length
            };
        } else
            block_start = {
                line: getCurrentPosition().line,
                pos: getCurrentPosition().pos
            };
        if (search_content(params.block_params)) {
            updateCurrentPosition(search(getTextInfo().text[getCurrentPosition().line], params.block_params[0], getCurrentPosition().pos));

            parameter = content_maker(block_start); //написать функцию поиска параметра
            updateBlockParameter(block_id, parameter);
        }

    }
    updateBlockContent(block_id, content);
    updateBlockInnerStructureNumb(block_id, in_str_numb);
    return block_id;

}

//возможно, ненужная функция по определению типа блока (с {} / без {})
function construction_type_find(construction, params) {
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    let sc = params.block_construction[0];
    let constr_type;
    let start_pos = c_p.pos;
    if (search_result(t_i.text[c_p.line], sc, c_p.pos)) { //после ключевого слова ЯК указывается '{'
        let line1 = t_i.text[c_p.line].substring(0, start_pos);
        let line2 = t_i.text[c_p.line].substring(start_pos, t_i.text[c_p.line].length);
        line2 = line2.replaceAll(" ", "");
        line1 += line2;
        if (search(line1, sc, c_p.pos) - start_pos == 0)
            constr_type = 1;
        else
            constr_type = 2;
    } else
        constr_type = 2; //блок без {}
    return constr_type;
}

//перемещает положение курсора в тексте на начало кода блока
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

//перемещает положение курсора в тексте на окончание кода блока
function block_end_finder(c_t, params, id) {
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    let lines = t_i.text;
    let line = c_p.line;
    let pos = c_p.pos;
    let l, p, s = params.block_construction[1];

    let test = getLastBlockInfo();
    let type = test.type;
    let p_id = test.p_id;
    let t_id = test.id;
    if (type == 'break' || type == 'return')
        if (p_id == id) { //проверка относится ли брейк или ретерн к данному блоку
            if (c_t == 1 && search_result(lines[line], s, pos)) {
                l = line;
                p = search(lines[line], s, pos)
                updateCurrentPosition(p, l);
            }
            return true;
        }

    switch (c_t) {
        case 1:
            if (search_result(lines[line], s, pos)) {
                l = line;
                p = search(lines[line], s, pos)
            } else
                return false;
            break;
        case 2:
            if (t_id == id)
                return false;
            else
                return true;
            break;
        default:
            return false;
    }
    updateCurrentPosition(p, l);

    return true;
}


