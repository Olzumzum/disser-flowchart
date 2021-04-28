//пакет функции, которые помогают формировать код

import {getCurrentPosition, getTextInfo} from "./text_searcher";

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
export function content_maker(block) {
    let content = "";
    let t_i = getTextInfo();
    let c_p = getCurrentPosition();
    if (block.line != c_p.line) { // если блок в {...}
        content = t_i.text[block.line].substring(block.pos, t_i.text[block.line].length);
        for (var y = block.line + 1; y < c_p.line; y++)
            content += t_i.text[y];
        if (c_p.pos != 0)
            content += t_i.text[c_p.line].substring(0, c_p.pos);
    } else if (c_p.pos != 0)
        content = t_i.text[block.line].substring(block.pos, c_p.pos);
    content = content.replaceAll(' ', '');
    return content;
}

