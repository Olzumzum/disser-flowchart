import {IBlock} from "../blocks/primitives/IBlock";
import {DraggableBlock} from "./DraggableBlock";


/**
 * класс обращающий блоки в перетаскиваемые объекты
 * для отображения
 */

export interface BlockMap1
    {top: number; left: number; title: string, typeBlock: string, id: string }


export class RendrerManager {
    /**
     * Преобразовать имеющийся массив блоков в
     * мапу для отображения
     * @param blocks
     */

    convert(blocks: Array<IBlock>): Array<BlockMap1> {
        let convertBlocks = new Array<BlockMap1>()
        blocks.forEach(item => {
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

    public renderBlock(blocks: Array<IBlock>) {
        const b = this.convert(blocks)
        return b.forEach(item => {
            this.render(item)
        })
        // return this.render(this.h)
    }

//отображает перетаскиваемые блоки
    render(item: any) {
        return <DraggableBlock key={item.id} {...item} />
    }

    renders(item: any, key: any) {
        return <DraggableBlock key={key} id={item.id} {...item} />
    }

}