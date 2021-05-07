import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {InnerLevelContainer} from "./InnerLevelContainer";
import React, {CSSProperties} from "react";
import {getBlock} from "../../../store/action-creators/blocks";

const styleContainerKeeper: CSSProperties = {
    position: 'absolute',
    backgroundColor: "green"
}

export class ContainerKeeper {
    private _members = new Array<InnerLevelContainer>()

    init() {
        const blocks = getBlock()
        if (this._members.length === 0)
            blocks.forEach(item =>
                this.checkLevel(item))
    }

    checkLevel(block: IBlock) {
        if (!this.innerLevelExists(block))
            this.createInnerLevel(block)

    }

    innerLevelExists(block: IBlock): boolean {
        let result = false;

        if (this.members.length !== 0){
            //ищем уже существующий уровень с такими данными
            this._members.forEach(memb => {
                console.log("Блок с парент " + block.getParentId() + " a уровень " + memb.parentId)
                console.log("Блок с уровнем " + block.getInnerLevel() + "а уровень" + memb.level)

                if(!memb.parentId?.localeCompare(block.getParentId())
                && memb.level === block.getInnerLevel()){

                    memb.addContent(block)
                    result = true
                }
            })
            //если такого блока не нашлось, ищем родитея и либо создаем от него уровень, либо помещаем в тот же уровень
            if(!result){
                this._members.forEach(memb => {
                    memb.content.forEach(cont => {
                        //если блок на том же уровне с родителем - добавить
                        if(!cont.getId().localeCompare(block.getParentId())
                        && cont.getInnerLevel() === block.getInnerLevel()){
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
     * @param block
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

    get members(): any[] {
        return this._members;
    }

    addMember(block: IBlock) {
        const innerLevel = new InnerLevelContainer(
            block.getInnerLevel(),
            block.getParentId(),
            block.getLeft(),
            block.getTop())

        innerLevel.addContent(block)
        this._members.push(innerLevel)

    }


    render(): JSX.Element {
        return (
            <div style={styleContainerKeeper}>
                {Object.keys(this._members).map((id) =>
                    this._members[Number(id)].render())
                }
            </div>
        )
    }


}