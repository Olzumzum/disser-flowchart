//пакет функции, которые помогают формировать код

import {getCurrentPosition, getTextInfo, updateCurrentPosition} from "./text_searcher";
import {obj_array} from "./object_block";

//функция по формированию текста содержимого блока
export function content_maker(block, space_check) {
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
    if ((typeof space_check !== "undefined") &&((space_check == true)))
        content = content.replaceAll(' ', '');
    return content;
}

export function CreateBlockContent(block_start, c_t){
    let content = content_maker(block_start);
    if (c_t == 1)
            updateCurrentPosition(getCurrentPosition().pos+1);
    return content;
}

export function safeCurrentPosition(){
    let c_p = getCurrentPosition();
    let block = {
        line: c_p.line,
        pos: c_p.pos
    };
    return block;
}

export function neighbour_search(in_lvl){
    for (let i = obj_array.length-1; i >= 0; i--){
        if (obj_array[i].inner_lvl == in_lvl+1)
            return obj_array[i].id;
    }
}
