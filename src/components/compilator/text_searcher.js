//пакет функций по поиску символов и ЯК в тексте кода

import {get_language_params, constructions_list} from "./constructions";
import {content_maker, safeCurrentPosition} from "./block_creator";
import {create, getLastBlockInfo, obj_array} from "./object_block";
import {arr_list, var_list} from "./var_list";
import {search_unary_operator} from "./variables";

let end_flag = false;

export function get_end_flag() {
    return end_flag;
}

export function set_end_flag(bool) {
    end_flag = bool;
}

//объект, который хранит загруженный текст, рассматриваемую строку и номер символа
export const text_info = {
    lang: "",
    text: "",
}

export function updateText(line, text) {
    text_info.text[line] = text;
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

export function setCurrentPosition(pos, line) {
    let sub, test;
    let t_i = getTextInfo();

    if (typeof line !== "undefined")
        if (check_line(line))
            CurrentPosition.line = line;
        else {
            set_end_flag(true);
            return;
        }
    else
        line = getCurrentPosition().line;

    let check = text_info.text[line].length;
    if (pos < text_info.text[line].length) {
        sub = t_i.text[line].substring(pos, t_i.text[line].length);
        test = sub.replaceAll(" ", "");
        if (test.length < 1) {
            setCurrentPosition(0, line + 1);
        } else
            CurrentPosition.pos = pos;

    } else
        setCurrentPosition(0, line + 1);
}

function check_line(line) {
    if (line < getTextInfo().text.length)
        return true;
    else
        return false;
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
    if (typeof i === "undefined")
        i = 0;
    if (search(text, c, i) != -1)
        return true;
    else
        return false;
}

//функция нахождения позиции символа в тексте
export function search(text, c, i) {
    if (typeof i === "undefined")
        i = 0;
    return text.indexOf(c, i);
}

export function text_search(c, p) {
    let text = getTextInfo().text[getCurrentPosition().line];
    if (typeof p === "undefined")
        p = getCurrentPosition().pos;
    return text.indexOf(c, p);
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
            setCurrentPosition(end_pos);
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

    if (typeof text === "undefined") {
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
                setCurrentPosition(start_pos + symb1.length);
                while (search_content(symb_block))
                    ;
                return true;

            } else {
                setCurrentPosition(end_pos + symb2.length);
                return false;
            }
        } else {
            start_pos = search(text[line], symb1, pos);
            setCurrentPosition(start_pos + symb1.length);
            while (search_content(symb_block))
                ;
            return true;
        }
    else if (search_result(text[line], symb2, pos)) {
        let end_pos = search(text[line], symb2, pos);
        setCurrentPosition(end_pos + symb2.length);
        return false;
    } else {
        setCurrentPosition(0, getCurrentPosition().line + 1);
        return true;
    }
}

export function search_comment() {
    let params = get_language_params("", getTextInfo().lang);
    let text = getTextInfo().text;
    let c_p = safeCurrentPosition();
    let comment_start;
    let comment = "";
    let comment_pos = text_search(params.single_line_comment, c_p.pos)
    if (comment_pos != -1) {
        let block_start = safeCurrentPosition();
        comment_start = {
            pos: comment_pos,
            line: c_p.line
        };
        setCurrentPosition(text[c_p.line].length);
        comment = content_maker(comment_start);
        updateText(c_p.line, text[c_p.line].substring(0, comment_start.pos));
        setCurrentPosition(block_start.pos, block_start.line);
    } else {
        comment_pos = text_search(params.multi_line_comment[0], c_p.pos);
        if (comment_pos != -1) {
            comment_start = {
                pos: comment_pos,
                line: c_p.line
            };
            if (search_content(params.multi_line_comment))
                comment = content_maker(comment_start);
        }
    }
    return comment;
}

export function search_in_out_result() {
    let params = get_language_params('', getTextInfo().lang);
    let data_in = params.data_in;
    let data_out = params.data_out;

    if (text_search(data_in) != -1) {
        setCurrentPosition(getCurrentPosition().pos + data_in.length);
        return "input";
    } else if (text_search(data_out) != -1) {
        setCurrentPosition(getCurrentPosition().pos + data_out.length);
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
    let start_pos = text_search(start_symb);

    if (start_pos != -1) {
        start_pos = text_search(start_symb) + start_symb.length;
        setCurrentPosition(start_pos);
        start_block = safeCurrentPosition();
        while (true) {
            let middle_pos = text_search(middle_symb);
            if (middle_pos != -1) {
                if (!string_check(middle_symb, text_info.text[getCurrentPosition().line].substring(start_pos, middle_pos + middle_symb.length))) {
                    setCurrentPosition(middle_pos);
                    tmp = content_maker(start_block);
                    tmp = search_unary_operator(tmp);
                    create(p_id, n_id, type, in_lvl, tmp,
                        0, "", getCurrentComment());

                    n_id = getLastBlockInfo().id;
                    setCurrentPosition(middle_pos + middle_symb.length);
                    start_block = safeCurrentPosition();
                } else
                    setCurrentPosition(middle_pos + middle_symb.length);
            } else {
                let end_pos = text_search(end_symb);
                if (end_pos != -1) {
                    if (!string_check(end_symb, text_info.text[getCurrentPosition().line].substring(start_pos, end_pos + end_symb.length))) {
                        setCurrentPosition(end_pos);
                        tmp = content_maker(start_block);
                        tmp = search_unary_operator(tmp);
                        create(p_id, n_id, type, in_lvl, tmp,
                            0, "", getCurrentComment());

                        n_id = getLastBlockInfo().id;
                        setCurrentPosition(end_pos + end_symb.length);
                        return true;
                    } else
                        setCurrentPosition(end_pos + end_symb.length);
                } else
                    return false; //chto-to
            }

        }

        let string_test = false;
        for (let i = 0; i < params.string_symbols.let; i++)
            if (text_search(params.string_symbols[i] == -1)) {
            }
    } else return false;

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
                if (check_pos < symb_pos) {
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

//Проверка, не является ли искомый символ частью текста
export function param_check(symb, text, pos) {
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
                if (check_pos < symb_pos) {
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