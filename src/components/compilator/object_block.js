
/* в результате поиска блока создаю вот такой объект или хз как это называется

переменная с доступом к данным через ключевые слова.

Вам, Ольга, уйдет массив с данными объектами.
Если вам будет удобно, то я проведу сортироваку по уровню вложенности и родительскому элементу
 */

// сперва объявлю эти сраные пременные, чтобы не было ошибки при запуске проекта
let id, content, type, p_bool, parent, block = [], neighbour, parameter;
//Есди будут какие-то изменения я уведомлю Вас и занесу их в данный файл.

export let object_block = {
    id: id,                                 //id блока
    content: content,                       //содержимое / тело блока
    type: type,                             //тип блока if/while/for e.t.c.
    inner_structures_numb: block[2],        //количество вложенных структур
    parent: parent,                         //id блока-родителя
    parent_bool: p_bool,
    inner_lvl: block[4],
    neighbour: neighbour,
    parameter: parameter
};

//ID
/*
    целочисленный формат
    уникальный идентификатор каждого блока, его величина никак не отображает его положение в тексте,
        т.к. сперва в массив заносятся более глубокие конструкции
 */

//CONTENT
/*
    текстовый формат
    в вашей разработке, возможно, не несет никакой пользы
    поле содержит текст кода, который содержится в данном блоке.
    скорее всего, в дальнейшем будет устранет, в данный момент используется для отладки
 */

//TYPE
/*
    текстовый формат
    тип блока (if, else, switch, case, for, while, do-while{будет именоваться просто как "do"})
    в дальнейшем будет добавлен тип блока объявление/определение переменных,
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
    если вам будет так удобнее могу сделать, чтобы главный блок (тот что один единственный)
        был с уровнем вложенности 0
    пока что у главного блока INNER_LVL = -1, блоки, что скрываются за ним, имеют INNER_LVL = 0
 */

//PARENT
/*
    целочисленный формат
    ID блока, от которого ответвляется данный блок
    parent = -1 указывает на то, что данный блок является первоначальным во всей программе
    если у 2-х блоков одинаковый INNER_LVL а PARENT второго ссылается на ID первого,
        это означает, что второй блок следует за первым в свернутом виде
        надо будет это учитывать при разворачивании первого блока, чтобы из последнего вложенного в него блока
            стрелка уходила в тот самый второй блок.
     пример:

      while()
        if ()
            i++;
      for()
        y++;

      у блока while() if() i++ parent = -1, inner_lvl = 0
      у блока if() i++; parent = id блока while, inner_lvl = 1
      у блока for() y++; parent = id блока while, inner_lvl = 0

      при этом, при разворачивании блока while, стрелка к блоку for должна идти именно от блока i++;
      !т.о. у двух несвязанных друг с другом блока может быть один родитель
*/

//PARENT_BLOCK
/*
    булевый формат
    используется в моей программе для дальнейшего рассчета PARENT
    возможно, Вам не пригодится, но пускай будет на всякий
 */

//NEIGHBOUR
/*
     целочисленный формат
     ID блока - соседа (!у этого соседа при этом указывается иной сосед)
     при NEIGBOUR = -1 блок не имеет соседа.
     !используется только у блоков типа case и else
*/

//PARAMETER
/*
    текстовый формат
    содержит содержимое скобок ЯК () - while(), for(), if() ...
    необходимо будет написать обработчик данного поля в зависимости от типа блока,
        т.к. в скобках хранятся данные разного формата
       например
       if (i == y) // parameter = "i == y"
       for (int i=0; i < y; i++) // parameter = "i == y"
       и т.д.
 */

//ПАМЯТКА
/*
    пока не сделал формирование блоков на основе объявления и определения переменных
    сложно сказать как будут у вас формироваться блоки if/else на основе моих данных
    до этого я доберусь после описания всех ЯК (языковых конструкций), а там посмотрим.
    так что, если есть возможность, тоже начать работу с построения блоков циклов, буду признателен
    УДАЧИ, ОЛЬГА!
 */