import {IBlock} from "../blocks/primitives/IBlock";
import {DraggableBlock} from "./DraggableBlock";


/**
 * класс обращающий блоки в перетаскиваемые объекты
 * для отображения
 */

export interface BlockMap {
    top: number;
    left: number;
    title: string,
    typeBlock: string,
    id: string
}


/**
 * Преобразовать имеющийся массив блоков в
 * мапу для отображения
 * @param blocks
 */
export function convert(blocks: Array<IBlock>): Array<BlockMap> {
    let convertBlocks = new Array<BlockMap>()
    blocks.forEach(item => {
        convertBlocks.push(
            {

                id: item.getId()!.toString(),
                title: item.getTypeBlock(),
                left: item.getLeft(),
                top: item.getTop(),
                typeBlock: item.getTypeBlock(),

            })
    })
    return convertBlocks
}

export function renders(item: any, key: any) {
    return <DraggableBlock key={key} id={item.id} {...item}/>
}

