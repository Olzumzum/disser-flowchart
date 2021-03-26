import {IBlock} from "../blocks/primitives/IBlock";
import {blocksTypedSelector} from "../../hooks/blocksTypedSelector";

export const ConnectionCreator = (idOne: string, idTwo: string) => {
    setNeighbors(idOne, idTwo)
    console.log("связи созданы между " + idOne + " and "+ idTwo)
}

const setNeighbors = (idOne: string, idTwo: string) => {
    const {blocks} = blocksTypedSelector(state => state.blocks)


    blocks.forEach(item => {
        if(item.getId()?.localeCompare(idOne))
            item.setSubsequentNeighbor(idTwo)
        if(item.getId()?.localeCompare(idTwo))
            item.setPreviousNeighbor(idOne)
    })
}