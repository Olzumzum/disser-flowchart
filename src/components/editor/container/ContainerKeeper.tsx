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
        if (this.members.length === 0) return false;
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
                        return true;
                    }
                }
            })
        return false;
    }

    createInnerLevel(block: IBlock) {
        //если уровень больше, чем у
        if (this._members.length === 0 ||(block.getInnerLevel() >= this.members[this._members.length - 1].level)) {
            this.addMember(block)
            this._members[this._members.length - 1].addContent(block)
        }
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