//пакет функции, которые формируют объект массива (блок)


//функция создает объект (блок) и заносит в массив
export function create_block(id, blo, lines, line, block, type, p_bool) {
    //Формирование содержиого блока
    var content = content_maker(lines, block);
    var parent_id = parent_finder(block[2], id, blo, p_bool);
    var neighbour_id = neighbour_search(type, blo, block[4]);
    let parameter;
    //создание объекта
    let object_block = {
        content: content,
        id: id,
        parent_id: parent_id,
        neighbour_id: neighbour_id,
        type: type,
        inner_lvl: block[4],
        inner_structures_numb: block[2],
        parameter: parameter,
        parent_bool: p_bool,
    };
    blo.push(object_block);
  //  blocks.push(object_block);
}

//функция нахождения id соседнего блока
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

//функция по формированию текста содержимого блока
export function content_maker(lines, block) {
    var content = "";
    if (block[0].line != block[1].line) { // если блок в {...}
        content = lines[block[0].line].substring(block[0].pos, lines[block[0].line].length);
        for (var y = block[0].line + 1; y < block[1].line; y++)
            content += lines[y];
        content += lines[block[1].line].substring(0, block[1].pos);
    } else
        content = lines[block[0].line].substring(block[0].pos, block[1].pos);
    content = content.replaceAll(' ', '');
    return content;
}

