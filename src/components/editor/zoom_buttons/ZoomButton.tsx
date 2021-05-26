import {CSSProperties, FC} from "react";

interface ZoomButtonProps {
    img: string | undefined,
    name: string,
}

export const NAME_MINUS_BUTTON = "minus"
export const NAME_PLUS_BUTTON = "plus"


const styleButton: CSSProperties = {
    width: "35px",
    height: "35px",
    // border: "0.5px #a0a0a0",
}
let scale = 1;

export const ZoomButton: FC<ZoomButtonProps> = ({img, name}) => {

    const clickZoom = () =>{
        console.log("ZoomClick " + name)
        if(!name.localeCompare(NAME_MINUS_BUTTON)){
            scale -= .2;
           scale = zoom(scale)
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

const zoom =(scale: number) =>{
    const panel = document.getElementById("edit_panel")
    panel!!.style.transform = "scale(" + scale + ")"
    return scale
}