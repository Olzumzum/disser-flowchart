//функция нахождения объявления, определения переменных
import {get_language_params} from "./constructions";
import {
    getCurrentComment,
    getCurrentPosition,
    getTextInfo,
    search,
    search_result,
    updateCurrentPosition
} from "./text_searcher";
import {content_maker} from "./block_creator";
import {arr_list, newArr, newVar, var_list} from "./var_list"
import {object_block, obj_array, createBlock, getLastBlockInfo} from "./object_block";


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
            if (!search_result(variable, '[')) { //если не массив
                var_list.push(newVar(variable, type));
            } else {
                let size = variable.substring(search(variable, '['), variable.length);
                variable = variable.substring(0, search(variable, '['));
                arr_list.push(newArr(variable, type, size));
            }

            let content =  text.substring(block[0].start, block[1].end);
            let comment = "";
            //создание объекта блока инициализации переменной
            createBlock(p_id, n_id, "initializing", in_lvl, content, 0, type, getCurrentComment());
        } else {
            variable = text.substring(pos_s, pos_dat);
            var_list.push(newVar(variable, type));
            let arr = obj_array; //после отладки удалить

            //создание объекта блока инициализации переменной
            createBlock(p_id, n_id, "declaring", in_lvl, variable, 0, type, getCurrentComment());
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


        if (end_eq == -1){
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