import {ConnectionCreator} from "../../editor/connections/ConnectionCreator";

export const oneClickBlock = (id: string) => {
    ConnectionCreator(id, id)
}