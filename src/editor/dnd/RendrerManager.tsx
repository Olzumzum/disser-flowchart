import {IBlock} from "../blocks/primitives/IBlock";
import {DraggableBlock} from "./DraggableBlock";
import {BlockTypes} from "../blocks/primitives/BlockTypes";

//интерфейс имеющихся для отображения блоков
export interface BlockMap {
    [key: string]: { top: number; left: number; title: string, typeBlock: string }
}

/**
 * класс обращающий блоки в перетаскиваемые объекты
 * для отображения
 */
export class RendrerManager {
    /**
     * Преобразовать имеющийся массив блоков в
     * мапу для отображения
     * @param blocks
     */
    private convert(blocks: Array<IBlock>): Array<BlockMap> {
        let convertBlocks = new Array<BlockMap>()
        blocks.forEach(item => {
                let key: string = item.getId()!.toString()
                convertBlocks.push({key:
                        {top: item.getTop(), left: item.getLeft(),
                            title: item.getTitle(), typeBlock: item.getTypeBlock()}})
        })
        return convertBlocks
    }


    //
    // public renderBlock(blocks: Array<IBlock>){
    //
    // }

//отображает перетаскиваемые блоки
     render(item: any) {
        return <DraggableBlock key={item.id} {...item} />
    }


}