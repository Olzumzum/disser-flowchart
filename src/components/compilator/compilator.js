import {constructions} from './constructions'

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
    var lines = text.split('\n'); //делим файл на строки
    for (var line = 0; line < lines.length; line++) { // перебор строк
        for (var i = 0; i < constructions.length; i++) { //поиск языковых конструкций в строке
            if (search_result(lines[line], constructions[i])) { //ЯК найдена
                var str = "";
                for (; line < search_block(lines, line); line++)
                    str += lines[line];
                alert("Тело конструкции " + constructions[i] + ": " + str);
               /* if (search_block(lines, line)) {
                    //фнукция поиска блока ЯК
                } else { //если ЯК состоит из блока кода
                    alert("функия в разработке");
                }
*/

                /*if (search_c(lines[line], "{") == 0 || search_c(lines[line], "{") == 0) //если ЯК состоит из 1 строки
                alert("Тело " + constructions[i] + ": " + lines[line+1]);
            }*/

                //alert("Найден " + constructions[i]);
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

    if (search_result(lines[line],'{')) {
        var nested_constructions_numb = 0;
        var pos = search(lines[line], '{');
        //Проверка на то, записан ли блок в одну строку
        if (!search_result(lines[line], '}', pos)) { //если блок записан в разные строки
            var flag = 1, pos_start_block = 0,pos_end_block = 0;
            while (flag != 0) {
                line++;
                while (search_result(lines[line], '}', pos_end_block)){
                    flag--;
                    pos_end_block = search(lines[line],'}', pos_end_block);
                    pos_end_block++;
                }
                if (search_result(lines[line], '{'), pos_start_block) {
                    pos_start_block = search(lines[line],'}', pos_start_block)+1;
                    pos_start_block++;
                    flag++;
                }
            }
            return line;
        }
    }
    /*
    for(var i=line; i<lines.length; i++)
       return true;
    */
}
