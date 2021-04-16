import {constructions_list} from './constructions'

//Загрузка файла пользователя
export function load_file(){
    document.getElementById("uploaded_file").click();
}

//Чтение файла пользователя
export function read_file(){
    //debugger
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
    alert (text);
    var lines = text.split('\n'); //делим файл на строки
    for (var line = 0; line < lines.length; line++) { // перебор строк
        for (var i = 0; i < constructions_list.length; i++) { //поиск языковых конструкций в строке
            if (search_result(lines[line], constructions_list[i])) { //ЯК найдена
                var str="";
                var block = search_block(lines, line);
                if (block[0].line != block[1].line) { // если блок в {...}
                    str = lines[block[0].line].substring(block[0].pos + 1, lines[block[0].line].length);
                    for (var y = block[0].line + 1; y < block[1].line; y++)
                        str += lines[y];
                    str += lines[block[1].line].substring(0, block[1].pos-1);
                } else
                    str = lines[block[0].line].substring(block[0].pos, block[1].pos);
                alert("Тело конструкции " + constructions_list[i] + ": " + str);
               /* for (var y = 0; y< block.length; y++)
                    for (var z = 0; z<block[y].length; z++)
                        alert(block[y][z]);

                */
            }
        }


        /*
      var words;
      var lines = text.split('\n'); //делим файл на строки
      for (var line=0; line < lines.length; line++){
          words = lines[line].split(" "); //делим строки на слова
          for (var word=0; word < words.length; word++)
              alert(words[word]);
      }
       */
    }
}

function search(text, c, i) {
    if (typeof i !== "undefined"){
        return text.indexOf(c,i);
    } else
        return  text.indexOf(c);
}

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

//фнкция поиска блока ЯК
function search_block(lines, line) {
    var nested_constructions_numb = 0; //кол-во вложденных конструкций
    var block_start, block_end = {};
    var type;//тип написания блока


    if (search_result(lines[line],'{')) //после ключевого слова ЯК указывается '{'
        type = 1;
    else if ((search_result(lines[line+1],'{')) && (search(lines[line+1],'{')<1)) { // '{' указывается на следующей строке после ключевого слова
        type = 1;
        line++;
    }
    else
        type = 2; //блок без {}

    switch (type){
        case 1:
            //объект хранения координат начала блока
                block_start = {
                pos: search(lines[line], '{'),
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
                    pos: pos_end_block,
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
            if (!search_result(lines[line],';')){
                line++;
                if(search_result(lines[line],';')) {
                    block_start = {
                        pos: 0,
                        line: line
                    };
                    block_end = {
                        pos: search(lines[line],';')+1,
                        line: line
                    }
                } else {
                    //написать функцию по поиску новой языковой конструкции
                    block_start = {
                        pos: 0,
                        line: line
                    };
                    block_end = {
                        pos: search(lines[line],';')+1,
                        line: line
                    }
                }
            } else{  //поиск блока в одной строке c ключевым словом
                block_start = {
                    pos: search(lines[line],')')+1,
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


    if (search_result(lines[line],'{')) {


        //Проверка на то, записан ли блок в одну строку

    }

}
