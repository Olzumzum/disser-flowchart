import {IBlock} from "../blocks/primitives/bocks/IBlock";
import {InnerLevelContainer} from "./InnerLevelContainer";
import React, {CSSProperties} from "react";

const styleContainerKeeper: CSSProperties = {
    position: 'absolute',
    backgroundColor: "green"
}

export class ContainerKeeper {
    private _members = new Array<InnerLevelContainer>()

    checkLevel(block: IBlock) {
        if (!this.innerLevelExists(block))
            this.createInnerLevel(block)

    }

    innerLevelExists(block: IBlock): boolean {
       let result = false;
        if (this.members.length === 0) result = false;
        else
            this._members.forEach(memb => {

                //если уровень уже существует, добавляем туда блок
                if (memb.level === block.getInnerLevel()
                    // && !memb.parentId.localeCompare(block.getParameterId())
                ) {
                    //проверка, есть ли блок в списке
                    let isOnList = false
                    memb.content.forEach(item => {
                        if (!item.getId().localeCompare(block.getId()))
                            isOnList = true
                    })

                    if (!isOnList) {
                        memb.content.push(block)
                        result = true;
                    }
                }
            })
        return result;
    }

    createInnerLevel(block: IBlock) {
        //если уровень больше, чем у
        if (this._members.length === 0 ||(block.getInnerLevel() >= this.members[this._members.length - 1].level)) {
            this.addMember(block)
            this._members[this._members.length - 1].addContent(block)
        }
    }

    /**
     * Поиск контейнера уровня вложенности
     * @param level
     */
    getInnerLevel(level: number): InnerLevelContainer | undefined{
        let result: InnerLevelContainer | undefined = undefined
        this._members.forEach(item => {
            if(result === undefined && item.level === level) {
                result = item;
            }
        })
        return result
    }

    get members(): any[] {
        return this._members;
    }

    addMember(block: IBlock) {
        this._members.push(
            new InnerLevelContainer(
                block.getInnerLevel(),
                block.getParameterId(),
                block.getLeft(),
                block.getTop())
        )
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