import {constructions_list} from './constructions'

//Загрузка файла пользователя
export function load_file(){
    document.getElementById("uploaded_file").click();
}
//Чтение файла пользователя
export function read_file(){
    let text = "";
    let file = document.getElementById("uploaded_file").files[0];
    let file_name = file.name;
    let reader = new FileReader();
    reader.addEventListener('load', function (e){
        text = e.target.result;
        compile_in(text);
    });
    reader.addEventListener('error', function() {
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
        switch_block(lines);
    }
}

//функция нахождения позиции символа в тексте
function search(text, c, i) {
    if (typeof i !== "undefined"){
        return text.indexOf(c,i);
    } else
        return  text.indexOf(c);
}

//функция отображения результата нахождения символа в тексте
function search_result(text, c, i){
    if (typeof i !== "undefined") {
        if (search(text, c, i) != -1)
            return true;
        else
            return false;
    }else
    if (search(text, c) != -1)
        return true;
    else
        return false;
}

//функция отображения результата нахождения ЯК в строке
function search_construction_result(lines, line){
    for (var i=0; i<constructions_list.length; i++){
        if (search_result(lines[line], constructions_list[i])){
            return true;
        }
    }
    return false;
}

//функция нахождения координаты ЯК
function search_construction(lines, line){
    var start_pos, end_pos;
    for (var i=0; i<constructions_list.length; i++){
        if (search_result(lines[line], constructions_list[i])){
            start_pos = search(lines[line], constructions_list[i]);
            end_pos = start_pos + constructions_list[i].length;
            return [end_pos, constructions_list[i]];
        }
    }
    return false;
}

//функция нахождения вложенного блока
function search_inner_construction(lines, line, id, blocks){
    id++;
    var tmp = search_construction(lines, line);
    var block = search_block(lines, line, tmp, id);
    create_block(id, blocks, lines,line,blocks, tmp[1]);
    return block;
}

//функция поиска блока ЯК
function search_block(lines, line, const_arr, id, blocks) {
    var nested_constructions_numb = 0; //кол-во вложенных конструкций
    var block_start = {}, block_end = {};
    var type;//тип написания блока

    if (search_result(lines[line],'{', const_arr[0])) //после ключевого слова ЯК указывается '{'
        type = 1;
    else if ((search_result(lines[line+1],'{') && (search(lines[line+1],'{')<1))) { // '{' указывается на следующей строке после ключевого слова
        type = 1;
        line++;
    }
    else
        type = 2; //блок без {}

    switch (type){
        case 1:
            block_start = {
                pos: search(lines[line], '{')+1,
                line: line
            };
            if (!search_result(lines[line], '}', block_start.pos)) { //если блок записан в разные строки
                var flag = 1, pos;
                //определяется окончание блока в тексте
                while (flag != 0) {
                    pos = 0;
                    line++;
                    //если внутри блока использована ЯК
                    if(search_construction_result(lines, line)) {
                        nested_constructions_numb++;
                        var tmp = search_inner_construction(lines, line, id, blocks);
                        id++;
                        pos = tmp[1].pos+1;
                        line = tmp[1].line;
                        //ВЫЗЫВАЕМ ФУНКЦИЮ ПО СОЗДАНИЮ БЛОКА
                        /*
                            тута
                        */
                    }
                    //поиск позиции закрытия блока - '}'
                    if (((search_result(lines[line],'}', pos) && (!search_result(lines[line],'{',pos))) ||
                        ((search_result(lines[line],'}',pos)) &&
                            (search_result(lines[line],'{',pos))&&
                            (search(lines[line],'}',pos) < search(lines[line],'{',pos))))){
                        flag = 0;
                        pos = search(lines[line],'}',pos) + 1;
                    }

                    /*

                    while (search_result(lines[line], '}', pos_end_block)){
                        flag--;
                        pos_end_block = search(lines[line],'}', pos_end_block);
                        pos_end_block++;
                    }
                    //нахождение вложенных блоков {...}
                    if (search_result(lines[line], '{'), pos_start_block) {
                        pos_start_block = search(lines[line],'}', pos_start_block)+1;
                        //если в одной строке заканчивается и начинается разные блоки
                        if((flag != 0) || (flag == 0) && (pos_start_block < pos_end_block)){
                            nested_constructions_numb++;
                            flag++;
                        }
                    }
                    */
                }
                block_end = {
                    pos: pos-1,
                    line: line
                }
            }
            else{
                block_end = {
                    pos: search(lines[line], '}', block_start.pos+1),
                    line: line
                };
                return [block_start, block_end];
            }
            break;
        case 2:
            //поиск блока на следующей строке
            if (!search_result(lines[line],';', lines[line].length - 2)){
                line++;
                if(search_result(lines[line],';', lines[line].length - 2)) {
                    block_start = {
                        pos: 0,
                        line: line
                    };
                    block_end = {
                        pos: search(lines[line],';')+1,
                        line: line
                    }
                } else { //если в строке использована ЯК
                    if(search_construction(lines, line)){
                        nested_constructions_numb++;
                        var tmp = search_inner_construction(lines,line,id,blocks);
                        id++;
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
            } else{
                block_start = {
                    pos: search(lines[line],')')+1,
                    line: line
                };
                block_end = {
                    pos: search(lines[line],';',search(lines[line],')'))+1,
                    line: line
                }
            }
            break;
        default:
            alert("Ошибка написания языковой конструкции в строке " + line);
            break;
    }
    return [block_start, block_end, nested_constructions_numb];
}

//функция определения параметров поиска в зависимости от использованной ЯК
function switch_block(lines){
    var blocks=[];
    var id = 0; //id каждого блока
    var block,bl;
    var neighbour = false;
    for (var line = 0; line < lines.length; line++) { // перебор строк
        //поиск языковых конструкций в строке


        if (search_construction_result(lines, line)) { //ЯК найдена
            var constr_arr = search_construction(lines, line);
            switch (constr_arr[1]){
                case 'else':
                    neighbour = true;
                    break;
            }
            block = search_block(lines, line, constr_arr, id, blocks);
            create_block(id, blocks, lines, line, block, constr_arr[1]);
            line = block[1].line;
        }
    }
}

//функция формирования объекта
function create_block(id, blocks, lines, line, block, type){
    //Формирование содержиого блока
    var content = "";
    if (block[0].line != block[1].line) { // если блок в {...}
        content = lines[block[0].line].substring(block[0].pos, lines[block[0].line].length);
        for (var y = block[0].line + 1; y < block[1].line; y++)
            content += lines[y];
        content += lines[block[1].line].substring(0, block[1].pos);
    } else
        content = lines[block[0].line].substring(block[0].pos, block[1].pos);

    //создание объекта
    var object_block = {
        id: id,
        content: content,
        type: type,
        internal_structures: block[2],
    };
    blocks.push(object_block);
}

