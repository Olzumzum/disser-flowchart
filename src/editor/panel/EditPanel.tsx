import {CSSProperties, FC, useCallback, useState} from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../ItemTypes";
import {DragItem} from "../dnd/DragItem";
import {snapToGrid as doSnapToGrid} from '../dnd/snapToGrid'
import update from "immutability-helper";

import {IBlock} from "../blocks/primitives/IBlock";
import {CreatorBlock} from "../blocks/factory/CreatorBlock";
import {IBlockFactory} from "../blocks/factory/IBlockFactory";
import {BlockMap1, RendrerManager} from "../dnd/RendrerManager";


const styles: CSSProperties = {
    margin: 0,
    float: "right",
    width: "79%",
    height: 400,
    border: '1px solid black',
    backgroundColor: 'aqua'
    // position: 'relative',
}


export interface EditPanelProps {
    snapToGrid: boolean
}

const renderManager = new RendrerManager()


function getWidthComponentPanel(): number | null {
    const element = document.getElementById("component_panel")

    if (element != null) {
        return Number(element.offsetWidth)
    } else
        return null
}

//генерация уникального id
export function generateId(): string {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
}

let arBlock: Array<IBlock> = new Array<IBlock>()

const creator: IBlockFactory = new CreatorBlock()

const originalBlocks = creator.getOriginBlock()
let fd: Array<BlockMap1> = new Array<BlockMap1>()

export const EditPanel: FC<EditPanelProps> = ({snapToGrid}) => {
    const moveBlock = useCallback(
        (id: string, left: number, top: number) => {
            let flag = false
            //проверка - блок добавляется с панели перечисления
            // возможных компонентов (Component Panel) или нет
            Object.keys(originalBlocks).map((id) => {
                    if (!id.localeCompare(id)) {
                        flag = true
                    }
                }
            )
            if (flag) {
                // console.log("in flag" + id + " " + left + " " + top)
                //создаем новый id для добавляемого блока
                let idNew: string = generateId()
                arBlock.push(creator.createBlock(
                    originalBlocks[Number(id)].getTypeBlock(),
                    left - getWidthComponentPanel()!!,
                    top,
                    idNew
                )!!)

            } else {
                arBlock[Number(id)].setLeft(left)
                arBlock[Number(id)].setTop(top)
            }

            fd = renderManager.convert(arBlock)
            console.log("fd " + fd.length)

            fd.forEach(item => {
                console.log("id=" + item.left)
            })

            console.log("list " + arBlock.length)

        },
        [arBlock],

    )

    const [, drop] = useDrop({
        accept: ItemTypes.BLOCK,
        drop(item: DragItem, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number
                y: number
            }

            let left = Math.round(item.left + delta.x)
            let top = Math.round(item.top + delta.y)

            if (snapToGrid) {
                ;[left, top] = doSnapToGrid(left, top)
            }
            // console.log("element in drop " + item.id)
            moveBlock(item.id, left, top)
            return undefined
        },
    })



    return (

        <div>
            <div ref={drop} style={styles}>
                { arBlock.length}
                {/*{Object.keys(arBlock).map((key) =>*/}
                {/*    renderManager.render(renderManager.convert(arBlock)))}*/}
            </div>
        </div>
    )
}