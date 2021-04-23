//пакет функций по поиску символов и ЯК в тексте кода

import {get_language_params, constructions_list} from "./constructions";


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
export function search_construction_result(lines, line, l) {
    if (typeof l !== "indefined") {
        for (var i = 0; i < constructions_list.length; i++)
            if (search_result(lines[line], constructions_list[i], l)) {
                return true;
            }
    } else
        for (var i = 0; i < constructions_list.length; i++) {
            if (search_result(lines[line], constructions_list[i])) {
                return true;
            }
        }

    if (typeof l !== "indefined")
        for (var i = 0; i < constructions_list.length; i++)
            if (search_result(lines[line], constructions_list[i], l)) {
                return true;
            } else
                i++;
    else i++;


    return false;
}

//функция нахождения координаты ЯК в строке
export function search_construction(lines, line, l) {
    var start_pos, end_pos;
    if (typeof l !== "undefined")
        for (var i = 0; i < constructions_list.length; i++) {
            if (search_result(lines[line], constructions_list[i], l)) {
                start_pos = search(lines[line], constructions_list[i], l);
                end_pos = start_pos + constructions_list[i].length;
                return [end_pos, constructions_list[i]];
            }
        }
    else
        for (var i = 0; i < constructions_list.length; i++) {
            if (search_result(lines[line], constructions_list[i])) {
                start_pos = search(lines[line], constructions_list[i]);
                end_pos = start_pos + constructions_list[i].length;
                return [end_pos, constructions_list[i]];
            }
        }
    return false;
}

