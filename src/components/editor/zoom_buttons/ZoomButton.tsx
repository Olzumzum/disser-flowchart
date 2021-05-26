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

export const ZoomButton: FC<ZoomButtonProps> = ({img, name}) => {
    const clickZoom = () =>{
        console.log("ZoomClick " + name)
        if(!name.localeCompare(NAME_MINUS_BUTTON)){
            console.log("minus")
        } else {
            console.log("plus")
        }
    }
    return (
        <button>
            <img src={img} style={styleButton} onClick={clickZoom}/>
        </button>
    )
}