import {IBlock} from "../blocks/primitives/IBlock";
import {DraggableBlock} from "./DraggableBlock";


/**
 * класс обращающий блоки в перетаскиваемые объекты
 * для отображения
 */

export interface BlockMap
{top: number; left: number; title: string, typeBlock: string, id: string }


export class RendrerManager {
    /**
     * Преобразовать имеющийся массив блоков в
     * мапу для отображения
     * @param blocks
     */

    convert(blocks: Array<IBlock>): Array<BlockMap> {
        let convertBlocks = new Array<BlockMap>()
        blocks.forEach(item => {
            console.log(item)
            convertBlocks.push(
                {

                    id: item.getId()!.toString(),
                    title: item.getTitle(),
                    left: item.getLeft(),
                    top: item.getTop(),
                    typeBlock: item.getTypeBlock(),

                })
        })
        return convertBlocks
    }

//отображает перетаскиваемые блоки
    render(item: any) {
        return <DraggableBlock key={item.id} {...item} style={{backdrop: "blue"}} />
    }

    renders(item: any, key: any) {
        return <DraggableBlock key={key} id={item.id} {...item}/>
    }

}