//функция нахождения объявления, определения переменных
import {block_params} from "./constructions";
import {search, search_result} from "./text_searcher";
import {content_maker, create_block} from "./block_creator";
import {var_list} from "./var_list"
import {ob, ob_array} from "./object_block";

//возвращает позиции начала и конца блока объявления переменных
export function search_inic_construction(lines, line, lang, l) {
    let block_start, block_end;
    var start_pos, end_pos;
    let params = block_params('', lang);
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


    if (block_start.pos == line)
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
export function search_inic(lines, line, lang) {
    let type = "action";
    let content;
    let block = search_inic_construction(lines, line, lang);
    if (block != false) {
        content = content_maker(lines, block);
        variables_searcher(content, block);
    }

}

function variables_searcher(text, bl) {
    let variable;
    let pos = 0;
    let pos_equal = -1;
    let pos_dat = -1;
    let pos_s = 0;
    let block;
    let hey;
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
            var_list.push([text.substring(block[0].start, block[0].end), bl[2]]);
        } else {
            var_list.push([text.substring(pos_s, pos_dat), bl[2]]);
            let b = ob;
            b.id = 0;
            b.type = 'inic';
            b.parent_bool = true;
            b.content = text.substring(pos_s, pos_dat);
            b.inner_lvl = 0;
            b.inner_structures_numb = 0;
            b.neighbour_id = -1;
            b.parameter = bl[2];
            b.parent_id = -1;
            ob_array.push(b);
           // create_block(0, blocks, 0, );
            hey = var_list;
        }
        pos_s = pos_dat + 1;
    }
}


//возвращает значение, присваеваемое переменной
function equal_finder(text, pos_s, pos_e, pos) {
    let start_eq, end_eq;
    let s_c = [['{','}'], ['"','"'], ["'", "'"], ['`','`']];

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