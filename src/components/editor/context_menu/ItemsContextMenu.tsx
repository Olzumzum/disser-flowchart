import {BlockTransformationTypes} from "../block_conversion/BlockTransformationTypes";

/**
 * Список возможных преобразований блока, оотображаемый в контекстном меню
 * Дается расшифровка на русском языке каждой операции
 */
export const itemsContexMenu = [
    {id: BlockTransformationTypes.ADD_TWO_BLOCKS, message: "Добавить два блока"},
    {id: BlockTransformationTypes.CONDITIONAL_OPERATOR, message: "Условный оператор"},
    {id: BlockTransformationTypes.LOOP_WHILE, message: "Цикл while"},
    {id: BlockTransformationTypes.LOOP_FOR, message: "Цикл for"},
    {id: BlockTransformationTypes.LOOP_UNTIL, message: "Цикл until"},
    {id: BlockTransformationTypes.INOUTPUT, message: "Блок ввода/вывода"},
]