let blockPosition = [0,0]
let observer = null

function emitChange(){
    observer(blockPosition)
}

export function observe(receive){
    // if (o){
    //     throw new Error('Multiple observers not implemented.')
    // }
    //
    // observer = o
    // emitChange()

    const randPos = () => Math.floor(Math.random() * 8)
    setInterval(() => receive([randPos(), randPos()]), 500)
}

export function moveBlock(toX, toY){
    blockPosition = [toX, toY]
    emitChange()
}

