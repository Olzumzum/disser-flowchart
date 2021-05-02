//пакет функций по поиску символов и ЯК в тексте кода

import {get_language_params, constructions_list} from "./constructions";
import {content_maker} from "./block_creator";
import {getLastBlockInfo, obj_array} from "./object_block";

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
        }else
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

export function new_search(text, c, i) {
    let tmp;
    if (typeof i !== "undefined") {
        tmp = text.indexOf(c, i);
    } else
        tmp = text.indexOf(c);
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
export function search_content(symb_block) {
    let symb1 = symb_block[0];
    let symb2 = symb_block[1];
    let text = getTextInfo().text;
    let current_pos = getCurrentPosition();
    let line = current_pos.line;
    let pos = current_pos.pos;
    let start_pos, end_pos;
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
    let comment_pos = new_search(text[c_p.line], params.single_line_comment, c_p.pos)
    if (comment_pos != -1) {
        block_start = {
            pos: comment_pos,
            line: c_p.line
        };
        updateCurrentPosition(text[c_p.line].length - 1);
        comment = content_maker(block_start);
        updateCurrentPosition(block_start.pos, block_start.line);
    } else {
        comment_pos = new_search(text[c_p.line], params.multi_line_comment[0], c_p.pos);
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