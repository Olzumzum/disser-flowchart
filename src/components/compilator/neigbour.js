//пакет содержащий функции нахождения и создания соседниъ блоков (else, case)

//функция нахождения соседнего блока (if-else, switch-case)
import {getCurrentPosition, search_construction, updateCurrentPosition} from "./text_searcher";
import {search_block} from "./block_searcher";


export function neighbour_block(lines, block, type, id, blocks, inner_lvl, p_bool) {
    switch (type) {
        case 'if':
            if (else_constr_checking(lines, block[1], type)) {
                var tmp = else_construction(lines, block[1], type);
                id++;
                var line = tmp[1];
                //let block2 = search_block(lines, line, tmp[0], id, blocks, inner_lvl);
                // id = block2[3];
                //create_block(id, blocks, lines, line, block2, tmp[0][1], p_bool);
                //  id = block2[3];
                //  return block2;
            } else
                return block;
            break;
        default:
            return block;
            break;
    }
}

//функция, определяющая. используется ли ЯК else после ЯК if
function else_constr_checking() {
    let pos = getCurrentPosition().pos;
    let line = getCurrentPosition().line;
    let check = search_construction();
    if (check == 'else')
        return true;
    else
        updateCurrentPosition(pos, line);
    return false;
}

//функция, возвращающая данные о блоке else
function else_construction(lines, block, type) {
    var arr;
    let line;
    let info = [];
    if (type == "if") {
        arr = search_construction(lines, block.line, block.pos);
        if (arr == false) {
            arr = search_construction(lines, block.line + 1);
            if (arr == false)
                return false;
            else
                line = block.line + 1;
        } else
            line = block.line;
        info = [arr, line];
        return info;
    }
}
