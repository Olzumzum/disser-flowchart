/*
    ПРИВЕТСТВУЮ ТЕБЯ, ЮНЫЙ РАЗРАБОТЧИК!
    ТЫ ПОПАЛ В АД ПОД НАЗВАНИЕМ БЫДЛОКОД
    СЕЙЧАС Я ПОПЫТАЮСЬ ЧТО-ТО ОБЪЯСНИТЬ ТЕБЕ НА ЛОМАННОМ РУССКОМ ЯЗЫКЕ
    ПОЕХАЛИ
 */


//В НАЧАЛЕ ИДЕТ НЕМНОГО ДРИСНИ ПОД НАЗВАНИЕ ФУНКЦИИ И МАССИВЫ ДЛЯ ЗАПИСИ И ОБНОВЛЕНИЯ ОБЪЕКТОВ-БЛОКОВ

//функция создает объект и записывает его в массив
export function createBlock(p_id, n_id, type, in_lvl, content,
                            in_str_numb, param, com){
    let id = obj_array.length;
    obj_array[id] = object_block(id, p_id, n_id, type, in_lvl, content, in_str_numb, param, com);
}

//функция обновляет содержимое объекта-блока
export function updateBlockContent(id, content){
    obj_array[id].content = content;
}

//функция обновляет число вложенных конструкций в объекте-блоке
export function updateBlockInnerStructureNumb(id, numb){
    obj_array[id].inner_structures_numb = numb;
}

//функция возвращает данные по всем связям последнего в массиве объекта-блоке
export function getLastBlockInfo(){
    let lastBlock = obj_array[obj_array.length-1];
    let id = lastBlock.id;
    let p_id = lastBlock.parent_id;
    let n_id = lastBlock.neighbour_id;
    return {
        id,
        p_id,
        n_id
    };
}

//массив объектов, который необходимо получать
export const obj_array = [];

//функцция, создающая объект, который описывает блок
export function object_block(id, parent_id, neighbour_id, type, inner_lvl,
                             content, inner_structures_numb, parameter, comment){
    return {
        id,
        parent_id,
        neighbour_id,
        type,
        inner_lvl,
        content,
        inner_structures_numb,
        parameter,
        comment
    };
}

//ID
/*
    целочисленный формат
    уникальный идентификатор каждого блока
    ТЕПЕРЬ ОН ИМЕЕТ ОТНОШЕНИЕ К ПОЛОЖЕНИЮ БЛОКА В ПРОГРАММЕ
    самый главный родительский блок имеет id = -1
 */

//CONTENT
/*
    текстовый формат
    поле содержит текст кода, который содержится в данном блоке.
 */

//TYPE
/*
    текстовый формат
    тип блока (if, else, switch, case, for, while, do-while{будет именоваться просто как "do"},
    declaring, initializing, 'pereopredelation', default, input, output)
    мб дальше появится блок ретёрнов
    пока что не могу сказать, как будет называться данный тип блока
 */

//INNER_STRUCTURES_NUMB
/*
    целочисленный формат
    данное поле хранит количество блоков, вложенных в данный блок
    !!! НЕ ОБЩЕЕ ЧИСЛО БЛОКОВ ВНУТРИ, А ЧИСЛО БЛОКОВ НА СЛЕДУЮЩЕМ УРОВНЕ ВЛОЖЕННОСТИ
*/

//INNER_LVL
/*
    целочисленный формат
    уровень вложенности данного блока
    у главного блока INNER_LVL = 0, блоки, что скрываются за ним, имеют INNER_LVL = 1 и т.д.
 */

//PARENT_ID
/*
    целочисленный формат
    ID блока, в который вложен данный блок
    на первом уровне вложенности (inner_lvl = 1) все блоки будут ссылаться на родительский блок parent_id = -1

*/

//NEIGHBOUR_ID
/*
     целочисленный формат
     содержит id блока, за которым следует данный блок
     на первом уровне вложенности (inner_lvl = 1) самый первый блок (id = 0) будет иметь
     neighbour_id = -1; parent_id = -1.

     второй блок будет иметь
     neighbour_id = 0; parent_id = -1.
*/

//PARAMETER
/*
    текстовый формат
    хранит содержимое скобок ЯК () - while(), for(), if() ...
    необходимо будет написать обработчик данного поля в зависимости от типа блока,
        т.к. в скобках хранятся данные разного формата
       например
       if (i == y) // parameter = "i == y"
       for (int i=0; i < y; i++) // parameter = "i == y"
       и т.д.

      вы можете предложить, что записывать в данное поле блокам, не имеющим скобок-параметров
 */

//COMMENT
/*
    комментарии из кода к данному блоку
 */

//ПАМЯТКА
/*
    УДАЧИ, ОЛЬГА!
    ДА ХРАНИТ ВАС ГОСПОДЬ!
 */