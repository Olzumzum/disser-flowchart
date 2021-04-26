//пакет функций по поиску символов и ЯК в тексте кода

import {get_language_params, constructions_list} from "./constructions";

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
    let t_i = getTextInfo();
    if (line < t_i.text.length)
        if (typeof line !== "undefined")
            if (line < t_i.text.length)
                CurrentPosition.line = line;
    if (text_info.text[CurrentPosition.line].length - pos <= 2) {
        if (CurrentPosition.line < t_i.text.length) {
            CurrentPosition.line++;
            CurrentPosition.pos = 0;
        } else
            CurrentPosition.pos = t_i.text[CurrentPosition.line].length - 1;
    } else
        CurrentPosition.pos = pos;

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

//функция отображения результата нахождения ЯК в строке
export function search_construction_result() {
    for (var i = 0; i < constructions_list.length; i++)
        if (search_result(getTextInfo().text[getCurrentPosition().line], constructions_list[i], getCurrentPosition().pos))
            return true;
    return false;
}

//функция нахождения координаты ЯК в строке
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
                updateCurrentPosition(start_pos+1);
                while (search_content(symb_block))
                ;
                return true;

            } else {
                updateCurrentPosition(end_pos+1);
                return false;
            }
        } else {
            start_pos = search(text[line], symb1, pos);
            updateCurrentPosition(start_pos+1);
            while (!search_content(symb_block))
                ;
            return true;
        }
    else if (search_result(text[line], symb2, pos)) {
        let end_pos = search(text[line], symb2, pos);
        updateCurrentPosition(end_pos+1);
        return false;
    } else {
        updateCurrentPosition(0, getCurrentPosition().line + 1);
        return true;
    }
}