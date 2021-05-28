import {CSSProperties, FC} from "react";
import {redrewCanvas} from "../canvas/CanvasPainter";
import {blocksTypedSelector} from "../hooks/blocksTypedSelector";
import {useActions} from "../hooks/blockActions";

interface ZoomButtonProps {
    img: string | undefined,
    name: string,
}

export const NAME_MINUS_BUTTON = "minus"
export const NAME_PLUS_BUTTON = "plus"


const styleButton: CSSProperties = {
    width: "35px",
    height: "35px",
}
let scale = 1;

export const ZoomButton: FC<ZoomButtonProps> = ({img, name}) => {
    const {fetchBlocks} = useActions()

    const clickZoom = () => {
        if (!name.localeCompare(NAME_MINUS_BUTTON)) {
            scale -= .2;
            scale = zoom(scale)
            redrewCanvas()
            fetchBlocks()

        } else {
            scale += .2;
            scale = zoom(scale)
        }
    }
    return (
        <button>
            <img src={img} style={styleButton} onClick={clickZoom}/>
        </button>
    )
}

const zoom = (scale: number) => {
    const panel = document.getElementById("edit_panel")
    panel!!.style.transform = "scale(" + scale + ")"
    return scale
}