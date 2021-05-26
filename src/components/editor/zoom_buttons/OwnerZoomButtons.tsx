import {CSSProperties, FC} from "react";
import {NAME_MINUS_BUTTON, NAME_PLUS_BUTTON, ZoomButton} from "./ZoomButton";
import MinusImg from "../../../assets/images/minus.png";
import PlusImg from "../../../assets/images/plus.png";


const styleZoomOwner: CSSProperties = {
    zIndex: 20,
    left: "95%",
    bottom: "0%",
    right: "auto",
    position: "fixed",
    margin: "10px",
    padding: "5px",
}

export const OwnerZoomButtons: FC = () => {

    return (
        <div style={styleZoomOwner}>
            <ZoomButton img={MinusImg} name={NAME_MINUS_BUTTON}/>
            <ZoomButton img={PlusImg} name={NAME_PLUS_BUTTON}/>
        </div>
    )
}