import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {InnerLevelContainer} from "./InnerLevelContainer";
import React, {CSSProperties} from "react";
import {ContainerKeeperComponent} from "./ContainerKeeperComponent";
import {BlocksEventEmitter} from "../BlocksEmitter";
import {ContainerTypes} from "./ContainerTypes";

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
        BlocksEventEmitter.subscribe(ContainerTypes.IS_ROLLED,
            ([isRolled, idInnerLevel]: any) => {
                this.traversingNestingTree(idInnerLevel, isRolled)
                BlocksEventEmitter.dispatch(ContainerTypes.HIDE_CONTENT, [this.members,
                    idInnerLevel])
            })
    }

    // init() {
    //     const blocks = getBlock()
    //     if (this._members.length === 0)
    //         blocks.forEach(item =>
    //             this.checkLevel(item))
    // }

    /**
     *
     * @param block
     */
    addBlockToInnerLevel(block: IBlock) {
        if (!this.innerLevelExists(block))
            this.createInnerLevel(block)
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
                if (!memb.parentId?.localeCompare(block.getParentId())
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

    getInnerLevelByParentId(parentId: string): InnerLevelContainer | undefined {
        let result: InnerLevelContainer | undefined = undefined
        this._members.forEach(item => {
            if (result === undefined && !item.parentId?.localeCompare(parentId)) {
                result = item;
            }
        })
        return result
    }

    getInnerLevelById(id: string): InnerLevelContainer | undefined {
        let result: InnerLevelContainer | undefined = undefined
        this._members.forEach(item => {
            if (result === undefined && !item.id.localeCompare(id)) {
                result = item;
            }
        })
        return result
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

        this._members.forEach(item => {
            console.log("я " + item.id + " isRo "+ item.isRolledUp)
        })

        //контейнер, на который кликнули
        let innerLevelRolledUp = this.getInnerLevelById(idInnerLevel)
        console.log("сворачиваем " + innerLevelRolledUp?.id + " isRo " + innerLevelRolledUp?.isRolledUp)
        while (innerLevelRolledUp !== undefined){
            //его последний элемент
            const lastBlock = innerLevelRolledUp?.getLastNodeId()
            //получаем следующий контейнер по значению родителя
            innerLevelRolledUp = this.getInnerLevelByParentId(lastBlock!!)
            console.log("контейнер " + innerLevelRolledUp?.id)
            if(innerLevelRolledUp !== undefined){
                innerLevelRolledUp!!.isRolledUp = !innerLevelRolledUp!!.isRolledUp
                console.log("в состоянии " + innerLevelRolledUp!!.isRolledUp)
            }
        }


    }

}