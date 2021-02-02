/**
 * Магия перемещающая блок по клику
 * @type {number[]}
 */
import Block from "./editor/blocks/Block";

let blockPosition = [0, 0]
let observer = null

function emitChange() {
    observer(blockPosition);
}

export function observe(receive) {
    const randPos = () => Math.floor(Math.random() * 8)
    setInterval(() => receive([randPos(), randPos()]), 500)

    observer = receive;
    emitChange()
}

export function moveBlock(event) {
    console.log("mouse up, get coor")


    let toX = event.pageX;
    let toY = event.pageY;
    return(
        <Block x={toX} y={toY}/>
    )

}