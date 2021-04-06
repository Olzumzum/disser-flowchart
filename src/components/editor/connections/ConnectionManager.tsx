import React, {FC, useEffect, useRef} from "react";
import {ConnectionBlocks} from "./ConnectionBlocks";


interface ConnectionManagerProperties {
    // width: number,
    // height: number,
    // colorBar: string,
    // animationSpeed: number,
    // staggerDelay: number,
    // padding: number,
    // rotation: number,
    // data: number[]
}

export const ConnectionManager: FC<ConnectionManagerProperties> = props => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const context = canvasRef.current!!.getContext('2d')!!
        ConnectionBlocks(context, 50, 50)
    }, [])


    return (
        <canvas ref={canvasRef}{...props}/>
    )
}

// function createConnection(){
//
// }

