import * as BlockActionCreator from './blocks'
import * as DndActionCreator from './dndblock'

export default {
    ...BlockActionCreator,
    ...DndActionCreator
}