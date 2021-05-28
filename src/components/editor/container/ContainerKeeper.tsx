import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {InnerLevelContainer} from "./InnerLevelContainer";
import React, {CSSProperties} from "react";
import {ContainerKeeperComponent} from "./ContainerKeeperComponent";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContainerTypes} from "./ContainerTypes";
import {getBlockById} from "../../../store/action-creators/blocks";
import {DEFAULT_FOR_LINKS} from "../blocks/primitives/bocks/ParentBlock";
import {checkingInnerLevelOverlaps} from "./calcCoorContainerKeeper";

export const styleContainerKeeper: CSSProperties = {
    position: 'absolute',
    backgroundColor: "green"
}

/**
 * Сущность, отвечающая за хранение и отображение всех уровней вложенности
 */
export class ContainerKeeper {
    //все уровни вложенности
    private _members = new Array<InnerLevelContainer>()
    private _renderMembers = new Array<InnerLevelContainer>()


    get renderMembers(): InnerLevelContainer[] {
        return this._renderMembers;
    }

    constructor() {
        this._renderMembers = this.members
        BlocksEventEmitter.subscribe(ContainerTypes.CLICK_BY_PARENT, (idParentInner: string) => {
            const lastNodeId = this.getInnerLevelById(idParentInner)?.getLastNodeId()!!
            const innerLevel = this.getInnerLevelByLastNode(lastNodeId,
                getBlockById(lastNodeId)?.getInnerLevel()!!)
            BlocksEventEmitter.dispatch(ContainerTypes.HIDE_CONTENT, [this.members,
                innerLevel?.id])
        })

        BlocksEventEmitter.subscribe(ContainerTypes.IS_ROLLED,
            ([isRolled, idInnerLevel]: any) => {

                //последний блок в родительском контейнере
                const currentInnerLevel = this.getInnerLevelById(idInnerLevel)
                const parentInnerLevel =
                    this.getInnerLevelByLastNode(currentInnerLevel?.parentBlockId!!, currentInnerLevel?.level!!)

                if (parentInnerLevel !== undefined) {
                    parentInnerLevel!!.isNesting = true
                    parentInnerLevel!!.isContext = false
                }
                this.traversingNestingTree(idInnerLevel, isRolled)
                BlocksEventEmitter.dispatch(ContainerTypes.HIDE_CONTENT, [this.members,
                    idInnerLevel])
            })
    }

    init(blocks: Array<IBlock>) {
        // const blocks = getBlock()
        // if (this._members.length === 0)
        blocks.forEach(item =>
            this.addBlockToInnerLevel(item))
    }

    /**
     *
     * @param block
     */
    addBlockToInnerLevel(block: IBlock) {

        if (!this.innerLevelExists(block)) {
            this.createInnerLevel(block)
        }

        checkingInnerLevelOverlaps(this._members)
    }

    /**
     * Проверить существует ли уровень вложенности с таким родителем и значением уровня
     * @param block - блок, который необходимо добавить в какой-то уровень
     */
    innerLevelExists(block: IBlock): boolean {
        let result = false;

        if (this.members.length !== 0) {
            //ищем уже существующий уровень с такими данными
            this._members.forEach(memb => {
                if (!memb.parentBlockId?.localeCompare(block.getParentId())
                    && memb.level === block.getInnerLevel()) {

                    memb.addContent(block)
                    result = true
                }
            })
            //если такого блока не нашлось, ищем родитея и либо создаем от него уровень, либо помещаем в тот же уровень
            if (!result) {
                this._members.forEach(memb => {
                    memb.content.forEach(cont => {
                        //если блок на том же уровне с родителем - добавить
                        if (!cont.getId().localeCompare(block.getParentId())
                            && cont.getInnerLevel() === block.getInnerLevel()) {
                            memb.addContent(block)
                            result = true
                        }
                    })
                })
            }
        }
        return result;
    }

    /**
     * Создать новый уровень вложенности
     * @param block - блок, добавляемый в новый уровень
     */
    createInnerLevel(block: IBlock) {
        this.addMember(block)
    }

    /**
     * Поиск контейнера уровня вложенности
     * @param level
     */
    getInnerLevel(level: number): InnerLevelContainer | undefined {
        let result: InnerLevelContainer | undefined = undefined
        this._members.forEach(item => {
            if (result === undefined && item.level === level) {
                result = item;
            }
        })
        return result
    }

    /**
     * получить уровень вложенности, зная идентификатор родительского блока,
     * который породил этот уровень
     * @param parentId
     */
    getInnerLevelByParentId(parentId: string): InnerLevelContainer | undefined {
        let result: InnerLevelContainer | undefined = undefined
        this._members.forEach(item => {
            if (result === undefined && !item.parentBlockId?.localeCompare(parentId)) {
                result = item;
            }
        })
        return result
    }

    /**
     * вернуть уровень вложенности, зная его id
     * @param id
     */
    getInnerLevelById(id: string): InnerLevelContainer | undefined {
        let result: InnerLevelContainer | undefined = undefined
        this._members.forEach(item => {
            if (result === undefined && !item.id.localeCompare(id)) {
                result = item;
            }
        })
        return result
    }

    getInnerLevelByLastNode(idLastNode: string, level: number) {
        let innerLevelId: string | null = null
        let resultInnerLevel: InnerLevelContainer | undefined

        const currentLevel = level - 1

        if (currentLevel >= 0) {
            let block = getBlockById(idLastNode)
            while (block?.getInnerLevel() === currentLevel) {
                block = getBlockById(block.getParentId())
            }
            //на выходе у нас первый блок уровня
            if (!block?.getParentId().localeCompare(DEFAULT_FOR_LINKS)) {
                this._members.forEach(item => {
                    if (item.level === 0) {
                        innerLevelId = item.id
                        resultInnerLevel = this.getInnerLevelById(innerLevelId)
                    }
                })
            } else {
                innerLevelId = block?.getParentId()
                resultInnerLevel = this.getInnerLevelByParentId(innerLevelId)
            }

        }
        return resultInnerLevel
    }

    get members(): any[] {
        return this._members;
    }

    /**
     * добавление нового уровня вложенности
     * @param block - блок, который добавляется в уровень
     */
    addMember(block: IBlock) {
        const innerLevel = new InnerLevelContainer(
            block.getInnerLevel(),
            block.getParentId(),
            block.getLeft(),
            block.getTop())

        innerLevel.addContent(block)
        this._members.push(innerLevel)

        if (block.getParentId().localeCompare(DEFAULT_FOR_LINKS)) {
            //задать родителя в дереве
            innerLevel.parentId = this.getInnerLevelByBlock(block.getParentId())!!
            const parentInnerLevel = this.getInnerLevelById(innerLevel.parentId)

            //задать дите родителю, если его еще нет
            if (!parentInnerLevel?.childId.localeCompare(DEFAULT_FOR_LINKS)) {
                parentInnerLevel!!.childId = innerLevel.id

            } else {
                //задать соседа
                this.getInnerLevelNeighbour(parentInnerLevel?.id, innerLevel.id)
            }
        }
    }

    /**
     * Задать соседство в дереве уровней вложенности
     * @param idParentLevel
     * @param idCurrentLevel
     */
    getInnerLevelNeighbour(idParentLevel: string, idCurrentLevel: string){
        const parent = this.getInnerLevelById(idParentLevel)
        const child = this.getInnerLevelById(parent?.childId!!)
        let resultNeighbor: InnerLevelContainer | undefined
        let neighborId = child?.neighboursId

        while (neighborId?.localeCompare(DEFAULT_FOR_LINKS)) {
            const neighbor = this.getInnerLevelById(child?.neighboursId!!)
            neighborId = neighbor?.id
            if(neighborId?.localeCompare(DEFAULT_FOR_LINKS))
                resultNeighbor = neighbor
        }

        if (!resultNeighbor?.id.localeCompare(DEFAULT_FOR_LINKS))
            child!!.neighboursId = idCurrentLevel

        console.log("neighbor " + child?.neighboursId)
    }

    /**
     * Найти уровень вложенности, содержащий этот блок
     * @param blockId
     */
    getInnerLevelByBlock(blockId: string) {
        const block = getBlockById(blockId)!!
        let idInnerLevel: string | undefined
        this._members.forEach(level => {
            level.content.forEach(b => {
                if (!b.getId().localeCompare(block.getId()))
                    idInnerLevel = level.id
            })
        })
        return idInnerLevel
    }


    /**
     * отобразить все уровни вложенности
     */
    render(): JSX.Element {
        return (
            <ContainerKeeperComponent members={this.members}/>
        )
    }

    traversingNestingTree(idInnerLevel: string, isRolledUp: boolean) {
        //контейнер, на который кликнули
        let innerLevelRolledUp = this.getInnerLevelById(idInnerLevel)
        //уровень контейнера на который кликнули, выше него или на том же уровне не скрывать элементы
        const rolledUpLevel = innerLevelRolledUp?.level
        console.log("rolledUpInnerLevel " + rolledUpLevel)
        // console.log("сворачиваем " + innerLevelRolledUp?.id + " isRo " + innerLevelRolledUp?.isRolledUp)
        while (innerLevelRolledUp !== undefined) {
            //его последний элемент
            const lastBlock = innerLevelRolledUp?.getLastNodeId()
            //получаем следующий контейнер по значению родителя
            innerLevelRolledUp = this.getInnerLevelByParentId(lastBlock!!)
            // console.log("контейнер " + innerLevelRolledUp?.id)
            if (innerLevelRolledUp !== undefined && innerLevelRolledUp.level > rolledUpLevel!!) {
                innerLevelRolledUp!!.isRolledUp = !innerLevelRolledUp!!.isRolledUp
                // console.log("в состоянии " + innerLevelRolledUp!!.isRolledUp)
            }
        }


    }

}