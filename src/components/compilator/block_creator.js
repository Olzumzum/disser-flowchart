//пакет функции, которые помогают формировать код

import {getCurrentPosition, getTextInfo, updateCurrentPosition} from "./text_searcher";

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

export function CreateBlockContent(block_start, c_t){
    let content = content_maker(block_start);
    if (c_t == 1)
            updateCurrentPosition(getCurrentPosition().pos+1);
    return content;
}

export function safeCurrentPosition(){
    let c_p = getCurrentPosition();
    let block = {
        pos: c_p.pos,
        line: c_p.line
    };
    return block;
}

