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
            if (search_result(lines[line], constructions_list[i],l)) {
                return true;
            }
    else
        for (var i = 0; i < constructions_list.length; i++) {
            if (search_result(lines[line], constructions_list[i])) {
                return true;
            }
        }
    return false;
}

//функция нахождения координаты ЯК
function search_construction(lines, line, l) {
    var start_pos, end_pos;
    if (typeof i !== "undefined")
        for (var i = 0; i < constructions_list.length; i++) {
            if (search_result(lines[line], constructions_list[i])) {
                start_pos = search(lines[line], constructions_list[i]);
                end_pos = start_pos + constructions_list[i].length;
                return [end_pos, constructions_list[i]];
            }
        }
    else
        for (var i = 0; i < constructions_list.length; i++) {
            if (search_result(lines[line], constructions_list[i],l)) {
                start_pos = search(lines[line], constructions_list[i],l);
                end_pos = start_pos + constructions_list[i].length;
                return [end_pos, constructions_list[i]];
            }
        }
    return false;
}

//функция нахождения вложенного блока
function search_inner_construction(lines, line, id, blocks, inner_lvl) {
    var p_bool = false;
    var tmp = search_construction(lines, line);
    inner_lvl++;
    if (inner_lvl == 0)
        p_bool = true;
    var block = search_block(lines, line, tmp, id, blocks, inner_lvl, p_bool);
    id = block[3];
    create_block(id, blocks, lines, line, block, tmp[1]);
    block = neighbour_block(lines, block, tmp[1],id,blocks, inner_lvl, p_bool);
    //id = block[3];
    return block;
}
function neighbour_block(lines, block, type, id, blocks, inner_lvl, p_bool){

    if (else_constr_finder(lines,block[1],type)){
        var line = block[1].line;
        var tmp = search_construction(lines, line);
        if (tmp == false) {
            line++;
            tmp = search_construction(lines, line);
        }
        id++;
        let block2 = search_block(lines, line, tmp, id, blocks, inner_lvl, p_bool);
        create_block(id, blocks, lines, line, block2, tmp[1], p_bool);
        id = block2[3];
        return block2;
    }
    else return block;
}

//функция поиска блока ЯК
function search_block(lines, line, const_arr, id, blocks, inner_lvl) {
    var nested_constructions_numb = 0; //кол-во вложенных конструкций
    var block_start = {}, block_end = {};
    var type;//тип написания блока

    if (search_result(lines[line], '{', const_arr[0])) //после ключевого слова ЯК указывается '{'
        type = 1;
    else if ((search_result(lines[line + 1], '{') && (search(lines[line + 1], '{') < 1))) { // '{' указывается на следующей строке после ключевого слова
        type = 1;
        line++;
    } else
        type = 2; //блок без {}

    switch (type) {
        case 1:
            block_start = {
                pos: search(lines[line], '{') + 1,
                line: line
            };
            if (!search_result(lines[line], '}', block_start.pos)) { //если блок записан в разные строки
                var flag = 1, pos;
                //определяется окончание блока в тексте
                while (flag != 0) {
                    pos = 0;
                    line++;
                    //если внутри блока использована ЯК
                    if (search_construction_result(lines, line)) {
                        nested_constructions_numb++;
                        var tmp = search_inner_construction(lines, line, id, blocks, inner_lvl);
                        pos = tmp[1].pos + 1;
                        id = tmp[3] + 1;
                        line = tmp[1].line;
                        //ВЫЗЫВАЕМ ФУНКЦИЮ ПО СОЗДАНИЮ БЛОКА
                        /*
                            тута
                        */
                    }
                    //поиск позиции закрытия блока - '}'
                    if (((search_result(lines[line], '}', pos) && (!search_result(lines[line], '{', pos))) ||
                        ((search_result(lines[line], '}', pos)) &&
                            (search_result(lines[line], '{', pos)) &&
                            (search(lines[line], '}', pos) < search(lines[line], '{', pos))))) {
                        flag = 0;
                        pos = search(lines[line], '}', pos) + 1;
                    }
                }
                block_end = {
                    pos: pos - 1,
                    line: line
                }
            } else {
                block_end = {
                    pos: search(lines[line], '}', block_start.pos + 1),
                    line: line
                };
            }
            break;
        case 2:
            //поиск блока на следующей строке
            if (!search_result(lines[line], ';', lines[line].length - 2)) {
                line++;
                if (search_result(lines[line], ';', lines[line].length - 2)) {
                    block_start = {
                        pos: 0,
                        line: line
                    };
                    block_end = {
                        pos: search(lines[line], ';') + 1,
                        line: line
                    }
                } else { //если в строке использована ЯК
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
                    }

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
    }
    return [block_start, block_end, nested_constructions_numb, id, inner_lvl];
}

//функция определения параметров поиска в зависимости от использованной ЯК
function block_processing(lines) {
    var id = 0;
    var blocks = [];                  //массив из объектов-блоков
    var block;
    var neighbour = false;
    var inner_lvl = 0;              //уровень вложенности
    for (var line = 0; line < lines.length; line++) { // перебор строк
        //поиск языковых конструкций в строке
        if (search_construction_result(lines, line)) { //ЯК найдена
            var constr_arr = search_construction(lines, line);
            var p_bool = true;
            block = search_block(lines, line, constr_arr, id, blocks, inner_lvl);
            create_block(block[3], blocks, lines, line, block, constr_arr[1], p_bool);
            if (else_constr_finder(lines, block[1], constr_arr[1]))
                var i =0;
            line = block[1].line;
            id = block[3] + 1;
        }
    }
    /* for (var l=0; l<blocks.length; l++)
         alert(blocks[l].id);*/
/*
    let i = 0, b = 2;
    if (i < b)
        i++;
    else if (i > b)
        b++;
    else
        i--;*/
}

//функция формирования объекта
function create_block(id, blocks, lines, line, block, type, p_bool) {
    //Формирование содержиого блока
       var content = content_maker(lines, line, block);
    var parent = parent_finder(block[2], id, blocks, parent_bool);
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

//функция по формированию текста - содержимого блока
function content_maker(lines, line, block) {
    var content = "";
    if (block[0].line != block[1].line) { // если блок в {...}
        content = lines[block[0].line].substring(block[0].pos, lines[block[0].line].length);
        for (var y = block[0].line + 1; y < block[1].line; y++)
            content += lines[y];
        content += lines[block[1].line].substring(0, block[1].pos);
    } else
        content = lines[block[0].line].substring(block[0].pos, block[1].pos);
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

//функция разделения блоков по особенностям строения
function block_switch() {
    //будущий код
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

function else_constr_finder(lines, block, type){
    let check;
    if (type == "if") {
        var tmp = search_construction(lines, block.line, block.pos);
        if (tmp == false) {
            var tmp2 = search_construction(lines, block.line + 1, block.pos);
            if (tmp2 == false)
                return  false;
            else
                check = tmp2;
        }
        else
            check = tmp;
        if(check[1] == 'else')
            return true;
    }
    return  false;
}

