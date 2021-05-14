//пакет функций по нахождению блоков ЯК в тексте кода

import {get_language_params, c_inic_construction, constructions_list} from "./constructions";
import {
    end_flag, get_end_flag,
    getCurrentComment,
    getCurrentPosition,
    getTextInfo, in_out_block_param, new_search,
    newText,
    search, search_comment,
    search_construction,
    search_construction_result, search_content, search_in_out_result,
    search_result, set_end_flag, updateCurrentComment, updateCurrentPosition
} from "./text_searcher";
import {content_maker, CreateBlockContent, safeCurrentPosition} from "./block_creator";
import {search_init_block, search_init_construction, search_unary_operator, variables_searcher} from "./variables";
import {
    object_block,
    obj_array,
    create,
    getLastBlockInfo,
    updateBlockContent,
    updateBlockInnerStructureNumb, updateBlockParameter, getNeighbourBlockId, createBlock
} from "./object_block";
import {arr_list, function_list, post_action, pre_action, var_list} from "./var_list";
import {search_action_block} from "./action";

function testtttt(i) {
    alert(i);
}

//функция нахождения ЯК
export function block_processing(lines, lang) {
    set_end_flag(false);
    let inner_lvl = 0;              //уровень вложенности
    let parent_id = -1;
    let neighbour_id = -1;
    let inner_structure_numb = 0; //количество вложенных структур да следующей уровне
    //let block;
    newText(lang, lines);
    let l = getCurrentPosition().line;
    let p = 0;
    let t = getTextInfo().text.length - 1;
    let t_p = getTextInfo().text[t].length;
    let finded_block_id;
    do {

        finded_block_id = search_block(parent_id, neighbour_id, inner_lvl);
        if ((finded_block_id != neighbour_id) && (finded_block_id != false)) {
            neighbour_id = finded_block_id;
            inner_structure_numb++; // возможно лучше заменить на функцию
        }

        l = getCurrentPosition().line;
        let info = getLastBlockInfo();

        let otladka = getCurrentPosition();


        let test = obj_array;
        let testsss = "t";
    } while (!get_end_flag())


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
    let otl = obj_array;
    let block_id = false;

    let params = get_language_params('', getTextInfo().lang);
    updateCurrentComment(search_comment());
    let comcheck = getCurrentComment();
    let text_test = getTextInfo().text;


    let in_str_numb = 0;
    in_lvl++;


    if (search_construction_result()) { //если найден ЯК
        block_id = switch_block_construction(p_id, n_id, in_lvl);
    } else {
        block_id = search_init_block(p_id, n_id, in_lvl);  //Поиск инициализации и объявления
        if ((block_id != false) || (typeof block_id === "number")) {
            if (typeof block_id !== "number")
                block_id = getLastBlockInfo().id;
        } else {
            let type = search_in_out_result();
            if (type != false) {
                in_out_block_param(type, p_id, n_id, in_lvl);
                block_id = getLastBlockInfo().id;
            } else {
                block_id = search_action_block(p_id, n_id, in_lvl); //Поиск операции над переменными
                if (block_id != false)
                    block_id = getLastBlockInfo().id;
                else {
                    let text = getTextInfo().text;
                    let c_p = getCurrentPosition();
                    let line = c_p.line;
                    text = text[line];
                    let pos = c_p.pos;

                    let pos_end = new_search(params.block_end);

                    if (pos_end == -1)
                        pos_end = text.length;

                    let start = safeCurrentPosition();
                    updateCurrentPosition(pos_end);
                    let content = content_maker(start, true);
                    if (content.length != 0) {
                        let pos_param = search(content, params.block_params[0])
                        if (pos_param != -1) {
                            let func_name = content.substring(0, pos_param).replaceAll(" ", "");
                            updateCurrentPosition(start.pos, start.line);
                            let ns = new_search(params.block_params[0]);
                            updateCurrentPosition(ns);
                            start = safeCurrentPosition();
                            search_content(params.block_params);
                            let parameter = content_maker(start);
                            parameter = search_unary_operator(parameter);
                            create(p_id, n_id, "function_call", in_lvl, func_name, 0, parameter, getCurrentComment());
                            block_id = getLastBlockInfo().id;
                            updateCurrentPosition(pos_end + 1);
                        } else {
                            search_unary_operator(content);
                            if (pre_action.length != 0)
                                content = pre_action.shift();
                            else if (post_action.length != 0)
                                content = post_action.shift();
                            createBlock(p_id, n_id, "change_value", in_lvl, content, 0, "", getCurrentComment());
                            block_id = getLastBlockInfo().id;
                            updateCurrentPosition(pos_end + 1);
                        }


                        /*  } else {
                              let text = getTextInfo().text;
                              let c_p = getCurrentPosition();
                              let line = c_p.line;
                              text = text[line];
                              let pos = c_p.pos;
                              if (text.substring(pos, text.length) !=
                                  search_unary_operator(text.substring(pos, text.length))) {
                                  let content = "";
                                  if (pre_action.length != 0)
                                      content = pre_action.shift();
                                  else if (post_action.length != 0)
                                      content = post_action.shift();
                                  createBlock(p_id, n_id, "change_value", in_lvl, content, 0, "", getCurrentComment());
                                  block_id = getLastBlockInfo().id;
                                  updateCurrentPosition(getTextInfo().text[getCurrentPosition().line].length);
                           */
                    }
                    //переход на следующую строку
                    else {

                        if (pos == text.length)
                            updateCurrentPosition(0, getCurrentPosition().line + 1);
                        return n_id;
                    }
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


function for_parameter(text, p_id, n_id, in_lvl) {
    let t_i = getTextInfo();
    let params = get_language_params("", t_i.lang);
    let start_pos = 1;
    let end_pos = 0;
    let type = "";
    let i_c = params.inic_construction;
    let parameter;
    text = text.substring(search(text, params.block_params[0]) + params.block_params[0].length, text.length - 1);
    switch (t_i.lang) {
        case 'python':
            break;
        default:
            let param_blocks = delitel_strok(text, params.block_end);
            let inic_block = param_blocks.shift() + params.block_end;
            if (inic_block.replaceAll(" ", "").length != 0) {
                for (var i = 0; i < i_c.length; i++) {
                    if (search_result(inic_block, i_c[i])) {
                        start_pos = search(inic_block, i_c[i]);
                        end_pos = start_pos + i_c[i].length;
                        type = i_c[i];
                        break;
                    }
                }
                if (type != "") {
                    variables_searcher(inic_block.substring(end_pos, inic_block.length), type, p_id, n_id, in_lvl);
                    let tttt = obj_array;
                }
            }
            parameter = param_blocks.shift();

            let action_blocks = delitel_strok(param_blocks.shift(), ',');
            for (let i = 0; i < action_blocks.length; i++) {
                if (action_blocks[i] != search_unary_operator(action_blocks[i])) {
                    if (post_action.length != 0)
                        action_blocks[i] = post_action.pop();
                    else if (pre_action.length != 0)
                        action_blocks = pre_action.pop();
                }
            }

            let block = {
                parameter: parameter,
                action_blocks: action_blocks
            };
            return block;
    }
}

function delitel_strok(text, symb) {
    let params = get_language_params("", getTextInfo().lang);
    let text_blocks = [];
    let start_pos = 0, end_pos = 0;
    while (search(text, params.block_end, start_pos) != -1) {
        end_pos = search(text, params.block_end, start_pos);
        text_blocks.push(text.substring(start_pos, end_pos));
        start_pos = end_pos + params.block_end.length;
    }
    end_pos = text.length;
    text_blocks.push(text.substring(start_pos, end_pos));
    return text_blocks;

}

export function switch_block_construction(p_id, n_id, in_lvl, construction) {
    let block_start;
    let parameter, parameter_flag = false, parameter_construction, action_flag = false, action_block;
    let block_id;
    if (typeof construction === "undefined")
        construction = search_construction();
    let params = get_language_params(construction);
    let constr_type;
    let in_str_numb = 0;
    let content = "";
    block_start = safeCurrentPosition();

    switch (construction) {
        case 'function':
            updateCurrentPosition(new_search(params.block_params[0]));
            let function_name = content_maker(block_start, true);
            function_list[function_list.length - 1].name = content_maker(block_start, true);
            let tttteewewrew = function_list;
            block_start = safeCurrentPosition();
            search_content(params.block_params);
            parameter = content_maker(block_start, true);
            // ДОБАВИТЬ ПОИСК УНАРНЫХ ФИГНЕЙ
            parameter = function_name + "" + parameter;
            constr_type = construction_type_find(construction);
            block_start_finder(constr_type, params);

            break;
        case 'else':
            parameter = "";
            constr_type = construction_type_find(construction);
            block_start_finder(constr_type, params);
            break;
        case 'do':
            parameter_flag = true;
            constr_type = construction_type_find(construction);
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
            create(p_id, n_id, construction, in_lvl, content,
                0, "", getCurrentComment());
            updateCurrentPosition(getCurrentPosition().pos + 1);
            return block_id;
        case 'break':

            if (search_result(getTextInfo().text[getCurrentPosition().line], params.block_end, getCurrentPosition().pos))
                updateCurrentPosition(search(getTextInfo().text[getCurrentPosition().line], params.block_end, getCurrentPosition().pos) + params.block_end.length);
            create(p_id, n_id, construction, in_lvl, "",
                0, "", getCurrentPosition());
            return block_id;
        case 'for':
            search_content(params.block_params);
            parameter = content_maker(block_start); //написать функцию поиска параметра
            let block_arr = for_parameter(parameter, p_id, n_id, in_lvl);
            parameter = block_arr.parameter;
            action_flag = true;
            action_block = block_arr.action_blocks;
            constr_type = construction_type_find(construction);
            block_start_finder(constr_type, params);

            break;
        default:
            if (search_content(params.block_params))
                parameter = content_maker(block_start); //написать функцию поиска параметра
            constr_type = construction_type_find(construction);
            block_start_finder(constr_type, params);
            break;
    }

    create(p_id, n_id, construction, in_lvl, "",
        0, parameter, getCurrentComment());
    block_id = getLastBlockInfo().id;
    let neighbour_id = block_id;

    block_start = safeCurrentPosition();

    do {

        let block = search_block(block_id, neighbour_id, in_lvl);
        //ИСПРАВИТЬ УСЛОВИЕ
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
    if (action_flag) {
        for (let i = 0; i < action_block.length; i++)
            createBlock(block_id, neighbour_id, "change_value", in_lvl + 1, action_block[i], 0, "", "");
    }
    updateBlockContent(block_id, content);
    updateBlockInnerStructureNumb(block_id, in_str_numb);
    return block_id;

}

//возможно, ненужная функция по определению типа блока (с {} / без {})
function construction_type_find(construction) {
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    let sc = get_language_params(construction, getTextInfo().lang).block_construction[0];
    // let sc = params.block_construction[0];
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


