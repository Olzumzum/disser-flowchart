//пакет функций по поиску символов и ЯК в тексте кода

import {get_language_params, constructions_list} from "./constructions";
import {content_maker, safeCurrentPosition} from "./block_creator";
import {createBlock, getLastBlockInfo, obj_array} from "./object_block";
import {arr_list, var_list} from "./var_list";

//объект, который хранит загруженный текст, рассматриваемую строку и номер символа
export const text_info = {
    lang: "",
    text: "",
}

//функция создания
export function newText(lang, text) {
    text_info.lang = lang;
    text_info.text = text;
}

export function getTextInfo() {
    return text_info;
}

export const CurrentPosition = {
    line: 0,
    pos: 0,
}

export function getCurrentPosition() {
    return CurrentPosition;
}

export function updateCurrentPosition(pos, line) {
    let sub, test;
    let t_i = getTextInfo();

    if (typeof line !== "undefined") {
        if (line < t_i.text.length) {
            CurrentPosition.line = line;
        }
    } else
        line = getCurrentPosition().line

    let check = text_info.text[line].length;
    if (pos < text_info.text[line].length) {
        sub = t_i.text[line].substring(pos, t_i.text[line].length);
        test = sub.replaceAll(" ", "");

        if (test.length < 1) {
            if (CurrentPosition.line < t_i.text.length) {
                CurrentPosition.line++;
                CurrentPosition.pos = 0;
            } else
                CurrentPosition.pos = pos;
        } else
            CurrentPosition.pos = pos;

    } else if (CurrentPosition.line < t_i.text.length) {
        CurrentPosition.line++;
        CurrentPosition.pos = 0;
    }
}

export let CurrentComment = "";

export function getCurrentComment() {
    return CurrentComment;
}

export function updateCurrentComment(comment) {
    if (obj_array.length != 0) {
        let lastCom = getLastBlockInfo(obj_array.length - 1).comment;
        if (lastCom != getCurrentComment()) {
            CurrentComment += comment;
        } else
            CurrentComment = comment;
    } else
        CurrentComment += comment;
}

//функция отображения результата поиска символа в тексте
export function search_result(text, c, i) {
    if (typeof i !== "undefined") {
        if (search(text, c, i) != -1)
            return true;
        else
            return false;
    } else if (search(text, c) != -1)
        return true;
    else
        return false;
}

//функция нахождения позиции символа в тексте
export function search(text, c, i) {
    if (typeof i !== "undefined") {
        return text.indexOf(c, i);
    } else
        return text.indexOf(c);
}

export function new_search(c, p) {
    let tmp;
    let text = getTextInfo().text[getCurrentPosition().line];
    if (typeof p === "undefined")
        p = getCurrentPosition().pos;
    tmp = text.indexOf(c, p);
    return tmp;
}

//функция отображения результата нахождения ЯК в строке
export function search_construction_result() {
    for (var i = 0; i < constructions_list.length; i++)
        if (search_result(getTextInfo().text[getCurrentPosition().line], constructions_list[i], getCurrentPosition().pos))
            return true;
    return false;
}

//функция нахождения координат ЯК
export function search_construction() {
    let lines = getTextInfo().text;
    let line = getCurrentPosition().line;
    let l = getCurrentPosition().pos;
    let start_pos, end_pos;

    for (var i = 0; i < constructions_list.length; i++)
        if (search_result(lines[line], constructions_list[i], l)) {
            start_pos = search(lines[line], constructions_list[i], l);
            end_pos = start_pos + constructions_list[i].length;
            updateCurrentPosition(end_pos);
            return constructions_list[i];
        }

    return false;
}

//функция находит содержимое между двумя заданными символами
export function search_content(symb_block, text) {
    let symb1 = symb_block[0];
    let symb2 = symb_block[1];
    let line, pos;
    let start_pos, end_pos;

    if (text === undefined) {
        text = getTextInfo().text;
        let current_pos = getCurrentPosition();
        line = current_pos.line;
        pos = current_pos.pos;
    } else {
        line = 0;
        pos = 0;
    }

    if (search_result(text[line], symb1, pos))
        if (search_result(text[line], symb2, pos)) {
            end_pos = search(text[line], symb2, pos);
            start_pos = search(text[line], symb1, pos);
            if (start_pos < end_pos) {
                updateCurrentPosition(start_pos + symb1.length);
                while (search_content(symb_block))
                    ;
                return true;

            } else {
                updateCurrentPosition(end_pos + symb2.length);
                return false;
            }
        } else {
            start_pos = search(text[line], symb1, pos);
            updateCurrentPosition(start_pos + symb1.length);
            while (search_content(symb_block))
                ;
            return true;
        }
    else if (search_result(text[line], symb2, pos)) {
        let end_pos = search(text[line], symb2, pos);
        updateCurrentPosition(end_pos + symb2.length);
        return false;
    } else {
        updateCurrentPosition(0, getCurrentPosition().line + 1);
        return true;
    }
}

export function search_comment(params) {
    let text = getTextInfo().text;
    let c_p = getCurrentPosition();
    let block_start;
    let comment = "";
    let comment_pos = new_search(params.single_line_comment, c_p.pos)
    if (comment_pos != -1) {
        block_start = {
            pos: comment_pos,
            line: c_p.line
        };
        updateCurrentPosition(text[c_p.line].length - 1);
        comment = content_maker(block_start);
        updateCurrentPosition(block_start.pos, block_start.line);
    } else {
        comment_pos = new_search(params.multi_line_comment[0], c_p.pos);
        if (comment_pos != -1) {
            block_start = {
                pos: comment_pos,
                line: c_p.line
            };
            if (search_content(params.multi_line_comment))
                comment = content_maker(block_start);
        }
    }
    return comment;
}

export function search_in_out_result() {
    let params = get_language_params('', getTextInfo().lang);
    let data_in = params.data_in;
    let data_out = params.data_out;

    if (new_search(data_in) != -1) {
        updateCurrentPosition(getCurrentPosition().pos + data_in.length);
        return "input";
    } else if (new_search(data_out) != -1) {
        updateCurrentPosition(getCurrentPosition().pos + data_out.length);
        return "output";
    } else
        return false;
}


export function in_out_block_param(type, p_id, n_id, in_lvl) {
    let params = get_language_params("", getTextInfo().lang);
    let start_symb, middle_symb, end_symb;
    let tmp, start_block, var_name = "";
    switch (type) {
        case "input":
            start_symb = params.input_construction.start_symb;
            middle_symb = params.input_construction.middle_symb;
            end_symb = params.input_construction.end_symb;
            break;
        case "output":
            start_symb = params.output_construction.start_symb;
            middle_symb = params.output_construction.middle_symb;
            end_symb = params.output_construction.end_symb;
            break;
    }
    let start_pos = new_search(start_symb);

    if (start_pos != -1) {
        start_pos = new_search(start_symb) + start_symb.length;
        updateCurrentPosition(start_pos);
        start_block = safeCurrentPosition();
        while (true) {
            let middle_pos = new_search(middle_symb);
            if (middle_pos != -1) {
                if (!string_check(middle_symb, text_info.text[getCurrentPosition().line].substring(start_pos, middle_pos+middle_symb.length))){
                    updateCurrentPosition(middle_pos);
                    tmp = content_maker(start_block);
                    createBlock()
                    //n_id = create_in_out_block(type, p_id, n_id, in_lvl, tmp);
                    start_block = safeCurrentPosition();
                    updateCurrentPosition(middle_pos + middle_symb.length);
                }
                else
                    updateCurrentPosition(middle_pos + middle_symb.length);
            } else {
                let end_pos = new_search(end_symb);
                if (end_pos != -1) {
                    if (!string_check(end_symb, text_info.text[getCurrentPosition().line].substring(start_pos, end_pos+end_symb.length))) {
                        updateCurrentPosition(end_pos);
                        tmp = content_maker(start_block);
                        n_id = create_in_out_block(type, p_id, n_id, in_lvl, tmp);
                        updateCurrentPosition(end_pos + end_symb.length);
                        return true;
                    }else
                        updateCurrentPosition(end_pos + end_symb.length);
                } else
                    return false; //chto-to
            }

        }

        let string_test = false;
        for (let i = 0; i < params.string_symbols.let; i++)
            if (new_search(params.string_symbols[i] == -1)) {
            }
    } else return false;

}
//БЕСПОЛЕЗНАЯ ФУНКЦИЯ ПО МНЕНИЮ ОЛЬГИ
export function create_in_out_block(type, p_id, n_id, in_lvl, tmp) {
    let var_name = "";
    for (let i = 0; i < var_list.length; i++)
        if (search_result(tmp, var_list[i])) {
            var_name = tmp.indexOf(search(tmp, var_list[i]), var_list[i].length);
            break;
        } else if (search_result(tmp, arr_list[i].name)) {
            var_name = tmp.indexOf(search(tmp, arr_list[i].name), tmp.length - 1);
            break;
        }

    if (var_name != "") {
        createBlock(p_id, n_id, type, in_lvl, "",
            0, "", getCurrentComment());
    }
    return getLastBlockInfo().id;
}

//Проверка, не является ли искомый символ частью текста
export function string_check(symb, text, pos) {
    let params = get_language_params('', getTextInfo().lang);
    let line = 0;
    if (typeof text === undefined) {
        text = getTextInfo().text;
        line = getCurrentPosition().line;
        pos = getCurrentPosition().pos;
    }
    if (typeof pos === undefined)
        pos = 0;


    if (search_result(text[line], symb, pos)) {
        let symb_pos = search(text[line], symb, pos); //координата искомого символа
        for (let i = 0; i < params.string_symbols.length; i++) {
            let flag = 0;
            let start_pos = 0;
            let check_pos = search(text[line], params.string_symbols[i], start_pos);
            if (check_pos == -1) {
                if (flag == 1)
                    return true;
            } else {
                if (check_pos << symb_pos) {
                    if (flag == 1)
                        flag--;
                    else
                        flag++;
                    check_pos = params.string_symbols[i].length;
                } else if (flag == 1)
                    return true;
                else
                    break;

            }
        }
        return false;
    } else
        return false;
}