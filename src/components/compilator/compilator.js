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
    text = text.replaceAll('\t','');
    // alert (text);
    var lines = text.split('\n'); //делим файл на строки
    for (var line = 0; line < lines.length; line++) { // перебор строк
        //поиск языковых конструкций в строке
        if (search_construction_result(lines, line)) { //ЯК найдена
            var str="";
            var constr_arr = search_construction(lines, line);
            var block = search_block(lines, line, constr_arr);
            if (block[0].line != block[1].line) { // если блок в {...}
                str = lines[block[0].line].substring(block[0].pos, lines[block[0].line].length);
                for (var y = block[0].line + 1; y < block[1].line; y++)
                    str += lines[y];
                str += lines[block[1].line].substring(0, block[1].pos);
            } else
                str = lines[block[0].line].substring(block[0].pos, block[1].pos);
            alert("Тело конструкции: " +  str);
            line = block[1].line;
        }
    }
}

//функция нахождения позиции символа в тексте
function search(text, c, i) {
    if (typeof i !== "undefined"){
        return text.indexOf(c,i);
    } else
        return  text.indexOf(c);
}
//функция нахождения символа в тексте
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

function search_construction_result(lines, line){
    for (var i=0; i<constructions_list.length; i++){
        if (search_result(lines[line], constructions_list[i])){
            return true;
        }
    }
    return false;
}

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

//фнкция поиска блока ЯК
function search_block(lines, line, const_arr) {
    var nested_constructions_numb = 0; //кол-во вложенных конструкций
    var block_start, block_end = {};
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
            //объект хранения координат начала блока
            block_start = {
                pos: search(lines[line], '{')+1,
                line: line
            };
            if (!search_result(lines[line], '}', block_start.pos)) { //если блок записан в разные строки
                var flag = 1, pos_start_block = 0,pos_end_block = 0;
                while (flag != 0) {
                    line++;
                    //поиск позиции закрытия блока - '}'
                    while (search_result(lines[line], '}', pos_end_block)){
                        flag--;
                        pos_end_block = search(lines[line],'}', pos_end_block);
                        pos_end_block++;
                    }
                    //нахождение вложенных блоков {...}
                    if (search_result(lines[line], '{'), pos_start_block) {
                        pos_start_block = search(lines[line],'}', pos_start_block)+1;
                        pos_start_block++;
                        //если в одной строке заканчивается и начинается разные блоки
                        if((flag != 0) || (flag == 0) && (pos_start_block < pos_end_block)){
                            nested_constructions_numb++;
                            flag++;
                        }
                    }
                }
                block_end = {
                    pos: pos_end_block-1,
                    line: line
                }
                return [block_start, block_end];
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
                    if(search_construction_result(lines, line)){
                        var tmp2 = search_construction(lines,line);
                        var tmp = search_block(lines, line, tmp2);
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
            } else{  //поиск блока в одной строке c ключевым словом
                block_start = {
                    pos: search(lines[line],')'),
                    line: line
                };
                block_end = {
                    pos: search(lines[line],';')+1,
                    line: line
                }
            }

            return [block_start, block_end];
            break;
        default:
            alert("Ошибка написания языковой конструкции в строке " + line);
    }
}
