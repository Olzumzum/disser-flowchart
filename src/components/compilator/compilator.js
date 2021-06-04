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
    let lang = getLanguage(file_name);
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

function just_function(x){

    let z = prompt("Введите z");

    switch (x) {
        case 1:
            if (z < 10)
                z = 1;
            else if (z > 10)
                z = 2;
            else
                z = 3;
            break;
        case 2:
            do{

                z++;
            }while (z < 10)
            break;
        case 3:
            for (let i = 0; i < z; i++){
                if (x > 30)
                    break;
                x *= z;
            }
            break;
        default:
            x = x * 2;
            break;
    }
    alert (x);
}

// Обработка выбранного файла - преобразование во внутренний формат
function compile_in(text) {
   // just_function();
    if (text !== undefined) {
        text = text.replaceAll('\t', '');
        //text = text.replace(/\n+/g,'\n');
        // alert (text);
        let lines = text.split('\n'); //делим файл на строки
        for (let i = 0; i < lines.length; i++)
            lines[i] = lines[i].replaceAll('\r', '');

        let lang = 'cpp'; //тут необходимо передавать используемый
        //let lang = 'js';
        block_processing(lines, lang);
    }
}

function getLanguage(f_name){
    let extension = f_name.substring(f_name.lastIndexOf('.') + 1);
    let lang;
    switch (extension){
        case "cpp":
            lang = "cpp";
            break;
        case "cs":
            lang = "c#";
            break;
        case "c":
            lang = "c";
            break;
        case "py":
            lang = "py";
            break;
        case "cpp":
            lang = "cpp";
            break;
        case "java":
            lang = "java";
            break;
        default:
            lang = chooseLang(f_name); //окно выбора языка пользователем
    }

    return extension;
}

function chooseLang(f_name){
    //окно выбора языка
    let lang;
    return lang;
}