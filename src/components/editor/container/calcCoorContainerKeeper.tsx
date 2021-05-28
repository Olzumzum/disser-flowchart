import {InnerLevelContainer} from "./InnerLevelContainer";
import {redrewCanvas} from "../canvas/CanvasPainter";
import {containerKeeper} from "../panel/EditPanel";

const repulsiveForce = 50

//проверка наложений уровней вложенности
export function checkingInnerLevelOverlaps(levels: InnerLevelContainer[]) {
    levels.forEach(curLevel => {
        levels.forEach(l => {
            let levelWithNewCoor= checkAreasInnerLevels(curLevel, l)
            if(levelWithNewCoor !== null) {
                curLevel = levelWithNewCoor[0]
                l = levelWithNewCoor[1]
                const lk = containerKeeper.getInnerLevelById(l.id)

            }
        })
    })
}

//проверка координат
function checkAreasInnerLevels(curLev: InnerLevelContainer, checkLev: InnerLevelContainer): InnerLevelContainer[] | null {
    let result = false
    if (curLev.id.localeCompare(checkLev.id)) {
        // console.log("Nen " + curLev.id + " " + curLev.top + " and " + checkLev.id + " " + checkLev.top)
        if (checkCoor(curLev.top, curLev.left, checkLev.top, checkLev.left, checkLev.height, checkLev.width)) {
            result = true
            // console.log("Пересечение в верхней правой")
        }
        if (checkCoor(curLev.top + curLev.height, curLev.left,
            checkLev.top, checkLev.left, checkLev.height, checkLev.width)) {
            result = true
            // console.log("Пересечение в нижней правой")
        }
        if (checkCoor(curLev.top, curLev.left + curLev.width, checkLev.top,
            checkLev.left, checkLev.height, checkLev.width)) {
            result = true
            // console.log("Пересечение в верхней левой")
        }
        if (checkCoor(curLev.top + curLev.height, curLev.left + curLev.width,
            checkLev.top,
            checkLev.left, checkLev.height, checkLev.width)) {
            result = true
            // console.log("Пересечение в нижней левой")
        }
    }
    if (result)
        return changeCoorInnerLevel(curLev, checkLev)
    else return null
}

function checkCoor(curCoorTop: number,
                   curCoorLeft: number,
                   checkCoorTop: number,
                   checkCoorLeft: number,
                   checkHeight: number,
                   checkWidth: number)
    : boolean {
    let result = false

    if ((curCoorTop >= checkCoorTop
        && curCoorTop <= (checkCoorTop + checkHeight))
        && curCoorLeft >= checkCoorLeft
        && curCoorLeft <= (checkCoorLeft + checkWidth)
    ) {
        //имеется пересечение
        result = true
    }
    return result
}

function changeCoorInnerLevel(curLev: InnerLevelContainer, checkLev: InnerLevelContainer): InnerLevelContainer[] {
    //координаты середины родительского блока
    let coorMiddleParentContainer: number[]| null = null
    //если у блоков один родитель
    if(!curLev.parentId.localeCompare(checkLev.parentId)){
        coorMiddleParentContainer = findMiddleOfParentContainer(curLev.parentId)

        let movingBlocks = curLev.left - (coorMiddleParentContainer[0] + repulsiveForce)
        curLev.left = coorMiddleParentContainer[0] + repulsiveForce
        changeCoorBlocksByInnerLevel(movingBlocks, curLev)

        // if(checkLev.left !== (coorMiddleParentContainer[0] - repulsiveForce - checkLev.width)) {
            movingBlocks = checkLev.left - (coorMiddleParentContainer[0] - repulsiveForce - checkLev.width)
            checkLev.left = coorMiddleParentContainer[0] - repulsiveForce - checkLev.width

            console.log("mooving " + movingBlocks)
            changeCoorBlocksByInnerLevel(200, checkLev)
        // }
    }


    return [curLev, checkLev]
}

/**
 * рассчитать координаты середы родительского контейнера
 * @param parentLevel
 */
function findMiddleOfParentContainer(parentLevelId: string){
    const parentLevel = containerKeeper.getInnerLevelById(parentLevelId)!!
    let middleTop = parentLevel.top + parentLevel.height
    let middleBottom =  parentLevel.left + parentLevel.width / 2

    return [middleBottom, middleTop]
}

function changeCoorBlocksByInnerLevel(movingBlocks: number, innerLevel: InnerLevelContainer){
    console.log("inner lev " + innerLevel.id +" " + innerLevel.content.length + " mov " + movingBlocks)
    innerLevel.content.forEach(block => {
        console.log("block " + block.getId() + " " + block.getLeft())
        block.setLeft(block.getLeft() - movingBlocks)
        console.log("block new" + block.getId() + " " + block.getLeft())
    })
}

