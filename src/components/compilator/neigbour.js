//пакет содержащий функции нахождения и создания соседниъ блоков (else, case)

//функция нахождения соседнего блока (if-else, switch-case)
 import {search_construction} from "./text_searcher";
import {search_block} from "./block_searcher";
import {create_block} from "./block_creator";

export function neighbour_block(lines, block, type, id, blocks, inner_lvl, p_bool) {
    switch (type) {
        case 'if':
            if (else_constr_checking(lines, block[1], type)) {
                var tmp = else_construction(lines, block[1], type);
                id++;
                var line = tmp[1];
                let block2 = search_block(lines, line, tmp[0], id, blocks, inner_lvl);
                id = block2[3];
                create_block(id, blocks, lines, line, block2, tmp[0][1], p_bool);
                id = block2[3];
                return block2;
            } else
                return block;
            break;
        default:
            return block;
            break;
    }
}

//функция, определяющая. используется ли ЯК else после ЯК if
 function else_constr_checking(lines, block, type) {
     let check;
     if (type == "if") {
         var tmp = search_construction(lines, block.line, block.pos);
         if (tmp == false) {
             var tmp2 = search_construction(lines, block.line + 1);
             if (tmp2 == false)
                 return false;
             else
                 check = tmp2;
         } else
             check = tmp;
         if (check[1] == 'else')
             return true;
     }
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
