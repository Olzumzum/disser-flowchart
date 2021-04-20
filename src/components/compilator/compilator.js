import {constructions_list} from './constructions'

//Загрузка файла пользователя
export function load_file() {
    document.getElementById("uploaded_file").click();
}

//Чтение файла пользователя
export function read_file() {
    let text = "";
    let file = document.getElementById("uploaded_file").files[0];
    let file_name = file.name;
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        text = e.target.result;
        compile_in(text);
    });
    reader.addEventListener('error', function () {
        alert('Error : Failed to read file');
    });
    reader.readAsText(file);
}

// Обработка выбранного файла - преобразование во внутренний формат
function compile_in(text) {
    if (text !== undefined) {
        text = text.replaceAll('\t', '');
        // alert (text);
        var lines = text.split('\n'); //делим файл на строки
        block_processing(lines);
    }
}

//функция нахождения позиции символа в тексте
function search(text, c, i) {
    if (typeof i !== "undefined") {
        return text.indexOf(c, i);
    } else
        return text.indexOf(c);
}

//функция отображения результата нахождения символа в тексте
function search_result(text, c, i) {
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

//функция отображения результата нахождения ЯК в строке
function search_construction_result(lines, line, l) {
    if (typeof l !== "indefined")
        for (var i = 0; i < constructions_list.length; i++)
            if (search_result(lines[line], constructions_list[i], l)) {
                return true;
            } else
                for (var i = 0; i < constructions_list.length; i++) {
                    if (search_result(lines[line], constructions_list[i])) {
                        return true;
                    }
                }
    return false;
}

//функция нахождения координаты ЯК в строке
function search_construction(lines, line, l) {
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

//основная функция по нахождению ЯК, определению блока и созданию объекта
function search_inner_construction(lines, line, id, blocks, inner_lvl) {
    var p_bool = false;
    var tmp = search_construction(lines, line);
    inner_lvl++;
    if (inner_lvl == 0)
        p_bool = true;
    var block = search_block(lines, line, tmp, id, blocks, inner_lvl);
    id = block[3];
    create_block(id, blocks, lines, line, block, tmp[1], p_bool);
    block = neighbour_block(lines, block, tmp[1], id, blocks, inner_lvl, p_bool);
    id = block[3] + 1;
    return block;
}

//функция нахождения соседнего блока (if-else, switch-case)
function neighbour_block(lines, block, type, id, blocks, inner_lvl, p_bool) {
    switch (type) {
        case 'else':
            if (else_constr_finder(lines, block[1], type)) {
                var tmp = else_construction(lines, block[1], type);
                id++;
                var line = tmp[1];
                let block2 = search_block(lines, line, tmp[0], id, blocks, inner_lvl);
                id = block2[3];
                create_block(id, blocks, lines, line, block2, tmp[0][1], p_bool);
                id = block2[3];
                return block2;
            } else
                return block;
            break;
        default:
            return block;
            break;
    }
}

//функция нахождения ЯК
function block_processing(lines) {
    var id = 0;
    var blocks = [];                  //массив из объектов-блоков
    var block;
    var neighbour = false;
    var inner_lvl = -1;              //уровень вложенности
    for (var line = 0; line < lines.length; line++) { // перебор строк
        //поиск языковых конструкций в строке
        if (search_construction_result(lines, line)) { //ЯК найдена
            block = search_inner_construction(lines, line, id, blocks, inner_lvl);
            id = block[3] + 1;
            line = block[1].line;

        }
    }
}

//функция формирования блока ЯК
function search_block(lines, line, constr_arr, id, blocks, inner_lvl) {
    var nested_constructions_numb = 0; //кол-во вложенных конструкций
    var block_start = {}, block_end = {};

    let type = constr_arr[1];
    let constr_pos = constr_arr[0];
    let params = block_params(type);

    let constr_type = block_type_find(lines, line, params.block_construction, constr_pos); // сложность блока
    block_start = block_start_finder(lines, line, constr_pos, params, constr_type);
    let pos = block_start.pos;
    line = block_start.line;
    block_end = block_end_finder(lines, line, pos, params, constr_type);
    //определяется окончание блока в тексте
    if (block_end == false) {
        var flag = 1;
        pos = 0;
        while (flag != 0) {
            line++;
            block_end = block_end_finder(lines, line, pos, params, constr_type);
            if (search_construction_result(lines, line, pos)) {    //если внутри блока использована ЯК
                nested_constructions_numb++;
                var tmp = search_inner_construction(lines, line, id, blocks, inner_lvl);
                pos = tmp[1].pos + 1;
                id = tmp[3] + 1;
                line = tmp[1].line - 1;
            } else if (block_end != false) {
                flag = 0;
            } else
                pos = 0;
        }
    }
    /*

    switch (constr_type) {
        case 1:
            block_end = block_end_finder(lines,line,pos, params, constr_type);
            if (block_end == false) {
                var flag = 1, pos;
                //определяется окончание блока в тексте
                while (flag != 0) {
                    block_end = block_end_finder(lines, line, pos, params, constr_type);
                    if (block_end != false) {
                        flag = 0;
                    } else
                        if (search_construction_result(lines, line)) {    //если внутри блока использована ЯК
                            nested_constructions_numb++;
                            var tmp = search_inner_construction(lines, line, id, blocks, inner_lvl);
                            pos = tmp[1].pos + 1;
                            id = tmp[3] + 1;
                            line = tmp[1].line;
                        }
                    pos = 0;
                    line++;
                }
            }
            break;
        case 2:
            if (search_construction(lines, line,)) {
                nested_constructions_numb++;
                var tmp = search_inner_construction(lines, line, id, blocks, inner_lvl);
                id = tmp[3] + 1;
                block_start = {
                    pos: 0,
                    line: line
                };
                block_end = {
                    pos: tmp[1].pos,
                    line: tmp[1].line
                }
            } else {
                block_start = {
                    pos: search(lines[line], ')') + 1,
                    line: line
                };
                block_end = {
                    pos: search(lines[line], ';', search(lines[line], ')')) + 1,
                    line: line
                }
            }
            break;
        default:
            alert("Ошибка написания языковой конструкции в строке " + line);
            break;
    }*/
    return [block_start, block_end, nested_constructions_numb, id, inner_lvl];
}

//функция формирования объекта на основе блока ЯК
function create_block(id, blocks, lines, line, block, type, p_bool) {
    //Формирование содержиого блока
    var content = content_maker(lines, line, block);
    var parent = parent_finder(block[2], id, blocks, p_bool);
    var neighbour = neighbour_search(type, blocks, block[4]);
    //создание объекта
    var object_block = {
        id: id,                                 //id блока
        content: content,                       //содержимое / тело блока
        type: type,                             //тип блока if/while/for e.t.c.
        inner_structures_numb: block[2],        //количество вложенных структур
        parent: parent,                         //id блока-родителя
        parent_bool: p_bool,
        inner_lvl: block[4],
        neighbour: neighbour
    };
    blocks.push(object_block);
}

//функция по формированию текста содержимого блока
function content_maker(lines, line, block) {
    var content = "";
    if (block[0].line != block[1].line) { // если блок в {...}
        content = lines[block[0].line].substring(block[0].pos, lines[block[0].line].length);
        for (var y = block[0].line + 1; y < block[1].line; y++)
            content += lines[y];
        content += lines[block[1].line].substring(0, block[1].pos - 1);
    } else
        content = lines[block[0].line].substring(block[0].pos, block[1].pos - 1);
    return content;
}

//функция нахождения родительских блоков
function parent_finder(inner_constr_numb, id, blocks, p_bool) {
    //указание id данного блока в качестве родительского для вложенных блоков
    var size = blocks.length - 1;
    if (inner_constr_numb != 0) {
        for (var i = size; i >= 0; i--) {
            if (!blocks[i].parent_bool && blocks[i].parent == -1)
                blocks[i].parent = id;
        }
    }
    //
    if (p_bool) {
        for (var i = size; i >= 0; i--) {
            if (blocks[i].parent_bool) {
                return i;
            }
        }
        return -1;
    } else
        return -1;
}

function neighbour_search(type, blocks, in_lvl) {
    let flag;
    let neighbour = -1;
    switch (type) {
        case "else":
            flag = true;
            break;
        default:
            flag = false;
            break;
    }
    if (flag)
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].inner_lvl == in_lvl) {
                neighbour = blocks[i].id;
                break;
            }
        }

    return neighbour;
}

function else_constr_finder(lines, block, type) {
    let check;
    if (type == "if") {
        var tmp = search_construction(lines, block.line, block.pos);
        if (tmp == false) {
            var tmp2 = search_construction(lines, block.line + 1);
            if (tmp2 == false)
                return false;
            else
                check = tmp2;
        } else
            check = tmp;
        if (check[1] == 'else')
            return true;
    }
    return false;
}

function else_construction(lines, block, type) {
    var arr;
    let line;
    let info = [];
    if (type == "if") {
        arr = search_construction(lines, block.line, block.pos);
        if (arr == false) {
            arr = search_construction(lines, block.line + 1);
            if (arr == false)
                return false;
            else
                line = block.line + 1;
        } else
            line = block.line;
        info = [arr, line];
        return info;
    }
}

//функция разделения блоков по особенностям строения
function block_params(type, lang) {
    //будущий код
    let simple_block_construction;
    let block_construction;
    let block_params;
    let block_end = ';';
    switch (type) {
        case 'case':
            block_params = [':', 'break'];
            block_construction = [' ', ':'];
            break;
        default:
            block_params = ['(', ')'];
            block_construction = ['{', '}'];
            break;

    }
    let params = {
        block_construction: block_construction,
        block_params: block_params,
        block_end: block_end,
    }
    return params;

}

//возможно, ненужная функция по определению типа блока (с {} / без {})
function block_type_find(lines, line, b_c, constr_pos) {
    let constr_type;
    if (search_result(lines[line], b_c[0], constr_pos)) //после ключевого слова ЯК указывается '{'
        constr_type = 1; //блок начинается на одной строке с ЯК
    else if ((search_result(lines[line + 1], b_c[0]) && (search(lines[line + 1], b_c) < 1))) { // '{' указывается на следующей строке после ключевого слова
        constr_type = 1; // блок начинается на следующей строке
        line++;
    } else
        constr_type = 2; //блок без {}
    return constr_type;
}

function block_start_finder(lines, line, pos, params, c_t) {
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
            if (search_result(lines[line], params.block_end, search(lines[line], params.block_params[1], pos))) {
                l = line;
                p = search(lines[line], params.block_params[1]) + 1;
            } else {
                l = line + 1;
                p = 0;
            }

            break;
    }
    block = {
        line: l,
        pos: p
    };
    return block;
}

function block_end_finder(lines, line, pos, params, c_t) {
    //это все костыли, пока не научу прогармму находить все блоки
    let block, l, p, s = params.block_construction[1];
    switch (c_t) {
        case 1:
            if (search_result(lines[line], s, pos)) {
                l = line;
                p = search(lines[line], s, pos) + s.length;
            } else
                return false;
            break;
        case 2:
            //МЕГА КОСТЫЛЬ НА ВРЕМЯ (ПОКА НЕ НАУЧУ НАХОДИТЬ БЛОКИ ОБЪЯВЛЕНИЙ И ОПРЕДЕЛЕНИЙ)
            if (lines[line].length > (search(lines[line], params.block_params[1])) + 1) {
                l = line;
                p = lines[line].length;
            } else {
                l = line + 1;
                p = lines[l].length;
            }
            break;
    }
    block = {
        line: l,
        pos: p
    };
    return block;
}
