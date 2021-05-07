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

    constructor() {
    }

    init() {
        const blocks = getBlock()
        if (this._members.length === 0)
            blocks.forEach(item =>
                this.checkLevel(item))
        console.log("Уровней вложенности " + this.members.length)
        this._members.forEach(i => console.log("Уровень " + i.level))
    }

    checkLevel(block: IBlock) {
        if (!this.innerLevelExists(block))
            this.createInnerLevel(block)

    }

    innerLevelExists(block: IBlock): boolean {
        let result = false;
        console.log("Элемент " + block.getId() + " уровень " + block.getInnerLevel())
        if (this.members.length === 0) result = false;
        else
            this._members.forEach((memb, iMemb) => {
                    // console.log("член " + iMemb + " а " + memb.level)
                if(!result) {
                    memb.content.forEach(itemLevel => {
                        if (!result) {
                            if (!itemLevel.getId().localeCompare(block.getParentId())) {
                                //если с родителем на одном уровне - добавить в этот уровень
                                if (itemLevel.getInnerLevel() === block.getInnerLevel()) {
                                    // console.log("Один уровень с родителем")
                                    memb.addContent(block)
                                    result = true
                                }

                                //если ниже родителя по уровню ищем соседей
                                if (itemLevel.getInnerLevel() < block.getInnerLevel()) {
                                    if (this._members.length > iMemb + 1) {
                                        if (this._members[iMemb+1].level === block.getInnerLevel()) {
                                            this._members[iMemb + 1].addContent(block)
                                            result = true
                                        } else console.log("Какой-то уникальный случай, когда уровень меньше," +
                                            "чем у потомков данного родителя")
                                    } else {

                                        result = false
                                    }
                                }

                                if (itemLevel.getInnerLevel() > block.getInnerLevel())
                                    console.log("Какая-то ошибка вложенности, " +
                                        "пересмотреть задачу проверки вложенности")

                            }
                        }
                    })
                }
            })
        return result;
    }

    /**
     * Создать новый уровень вложенности
     * @param block
     */
    createInnerLevel(block: IBlock) {
        this.addMember(block)
        this._members[this._members.length - 1].addContent(block)
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