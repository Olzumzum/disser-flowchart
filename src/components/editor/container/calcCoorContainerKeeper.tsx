import {InnerLevelContainer} from "./InnerLevelContainer";
import {containerKeeper} from "../panel/EditPanel";
import {DEFAULT_FOR_LINKS} from "../blocks/primitives/bocks/ParentBlock";

//минимальное расстояние, на котором находятся блоки
const repulsiveForce = 50

//проверка наложений уровней вложенности
export function checkingInnerLevelOverlaps(startNodeId: string) {
    //узлы на одном уровне
    let nodes: Array<InnerLevelContainer> = new Array<InnerLevelContainer>()
    let startNode = containerKeeper.getInnerLevelById(startNodeId)

    let curNode = startNode
    let curLevel = curNode?.level

    while (curNode?.childId.localeCompare(DEFAULT_FOR_LINKS)) {
        console.log("Тут " + curNode?.neighboursId)
        while (curNode?.neighboursId.localeCompare(DEFAULT_FOR_LINKS)) {
            console.log("сосед")
            const neighbour = containerKeeper.getInnerLevelById(curNode?.neighboursId)
            console.log("neighbour " + neighbour!!.id)
            nodes.push(neighbour!!)
            curNode = neighbour
        }
        curNode = containerKeeper.getInnerLevelById(curNode!!.childId)
    }


    // if (startNode?.parentId.localeCompare(DEFAULT_FOR_LINKS)) {
    //     let parentNode = containerKeeper.getInnerLevelById(startNode?.parentId!!)
    // }
}

function bypassingNodesAtSameLevel(nodes: InnerLevelContainer[]) {

}

//проходим по одному уровню для данного родителя
function checkLevel(curLevel: InnerLevelContainer) {
    while (curLevel.neighboursId.localeCompare(DEFAULT_FOR_LINKS)) {
        let neighbourLevel = containerKeeper.getInnerLevelById(curLevel.neighboursId)!!
        //два уровня с новыми координатами
        let levelWithNewCoor = checkAreasInnerLevels(curLevel, neighbourLevel)
        if (levelWithNewCoor !== null) {
            curLevel = levelWithNewCoor[0]
            neighbourLevel = levelWithNewCoor[1]
        }

        curLevel = neighbourLevel
    }
}

/**
 * Проверка всех вершин контейнера на пересечение с другим контейнером
 * @param curLev - проверяемый контейнер
 * @param checkLev - другой контейнер, с кем может пересечься текущий
 */
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

/**
 * Проверить, вершина контейнера попадает ли в другой контейнер
 * @param curCoorTop - проверяемая вершина
 * @param curCoorLeft - проверяемая вершина
 * @param checkCoorTop - координата другого контейнера для вычисления попадания в площадь
 * @param checkCoorLeft - координата другого контейнера для вычисления попадания в площадь
 * @param checkHeight - координата другого контейнера для вычисления попадания в площадь
 * @param checkWidth - координата другого контейнера для вычисления попадания в площадь
 */
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
    let idParentLevel: string
    //если у блоков один родитель
    if (!curLev.parentId.localeCompare(checkLev.parentId)) {
        idParentLevel = curLev.parentId
    } else {
        let idCurParent: string = curLev.parentId
        let idCheckPar: string = checkLev.parentId
        while (idCurParent.localeCompare(idCheckPar)) {
            const curpar = containerKeeper.getInnerLevelById(idCurParent)
            idCurParent = curpar?.parentId!!

            const checkpar = containerKeeper.getInnerLevelById(idCheckPar)
            idCheckPar = checkpar?.parentId!!
        }
        idParentLevel = idCurParent
    }

    if (idParentLevel !== undefined)
        return calcNewCoorByLevel(idParentLevel, curLev, checkLev)
    else return [curLev, checkLev]
}

/**
 * Рассчитать новые координаты двум уровням, находящимся по соседству
 * @param idParentLevel - родительский блок, от которого производится отсчет
 * @param curLev - уровень, координаты которого меняются
 * @param checkLev - уровень, координаты которого меняются
 */
function calcNewCoorByLevel(idParentLevel: string,
                            curLev: InnerLevelContainer, checkLev: InnerLevelContainer) {

    //рассчитать середину родительского контейнера
    let coorMiddleParentContainer = findMiddleOfParentContainer(idParentLevel)

    let movingBlocks = curLev.left - (coorMiddleParentContainer[0] + repulsiveForce)
    curLev.left = coorMiddleParentContainer[0] + repulsiveForce
    changeCoorBlocksByInnerLevel(movingBlocks, curLev)

    movingBlocks = checkLev.left - (coorMiddleParentContainer[0] - repulsiveForce - checkLev.width)
    checkLev.left = coorMiddleParentContainer[0] - repulsiveForce - checkLev.width
    changeCoorBlocksByInnerLevel(movingBlocks, checkLev)

    return [curLev, checkLev]
}

/**
 * рассчитать координаты середы родительского контейнера
 * @param parentLevel
 */
function findMiddleOfParentContainer(parentLevelId: string) {
    const parentLevel = containerKeeper.getInnerLevelById(parentLevelId)!!
    let middleTop = parentLevel.top + parentLevel.height
    let middleBottom = parentLevel.left + parentLevel.width / 2

    return [middleBottom, middleTop]
}

/**
 * поменять координаты у всех блоков внутри контейнера
 * @param movingBlocks
 * @param innerLevel
 */
function changeCoorBlocksByInnerLevel(movingBlocks: number, innerLevel: InnerLevelContainer) {
    innerLevel.content.forEach(block => {
        block.setLeft(block.getLeft() - movingBlocks)
    })
}

