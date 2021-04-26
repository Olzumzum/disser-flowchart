import {constructions_list} from './constructions'
import {block_processing} from "./block_searcher";

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
        text = text.replace(/\n+/g,'\n');
        // alert (text);
        var lines = text.split('\n'); //делим файл на строки
        let lang = 'c'; //тут необходимо передавать используемый ЯП
        block_processing(lines, lang);
    }
}
