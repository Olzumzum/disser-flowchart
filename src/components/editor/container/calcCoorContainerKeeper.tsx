import {InnerLevelContainer} from "./InnerLevelContainer";
import {containerKeeper} from "../panel/EditPanel";
import {DEFAULT_FOR_LINKS} from "../blocks/primitives/bocks/ParentBlock";

//минимальное расстояние, на котором находятся блоки
const repulsiveForce = 50

//проверка наложений уровней вложенности
export function checkingInnerLevelOverlaps(levels: Array<InnerLevelContainer>) {

    let queue: Array<InnerLevelContainer> = new Array<InnerLevelContainer>()
    let level = 0
    let fullness = true

    while (fullness) {
        levels.forEach(l => {
            if (level == l.level)
                queue.push(l)
        })
        level++;
        if (queue.length === 0)
            fullness = false

        queue.forEach(() => checkLevel(queue))
        queue = new Array<InnerLevelContainer>()
    }


}

function bypassingNodesAtSameLevel(nodes: InnerLevelContainer[]) {

}

//проходим по одному уровню для данного родителя
function checkLevel(queue: Array<InnerLevelContainer>) {
    queue.forEach(curLevel => {
        queue.forEach(neighbourLevel => {
            //два уровня с новыми координатами
            if (curLevel.id.localeCompare(neighbourLevel.id)) {
                checkAreasInnerLevels(curLevel, neighbourLevel)
            }
        })
    })
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
        }
        if (checkCoor(curLev.top + curLev.height, curLev.left,
            checkLev.top, checkLev.left, checkLev.height, checkLev.width)) {
            result = true
        }
        if (checkCoor(curLev.top, curLev.left + curLev.width, checkLev.top,
            checkLev.left, checkLev.height, checkLev.width)) {
            result = true
        }
        if (checkCoor(curLev.top + curLev.height, curLev.left + curLev.width,
            checkLev.top,
            checkLev.left, checkLev.height, checkLev.width)) {
            result = true
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

        const queue = new Array<InnerLevelContainer>()

        while (idCurParent.localeCompare(idCheckPar)) {
            const curpar = containerKeeper.getInnerLevelById(idCurParent)
            idCurParent = curpar?.parentId!!

            const checkpar = containerKeeper.getInnerLevelById(idCheckPar)
            idCheckPar = checkpar?.parentId!!

            queue.push(curpar!!)
            queue.push(checkpar!!)
        }
        idParentLevel = idCurParent

        queue.forEach(cont => {
            if (!cont.neighboursId.localeCompare(DEFAULT_FOR_LINKS)) {
                cont.left -= repulsiveForce
                changeCoorBlocksByInnerLevel(50, cont)
            } else {
                cont.left += repulsiveForce
                changeCoorBlocksByInnerLevel(-50, cont)
            }

        })
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

