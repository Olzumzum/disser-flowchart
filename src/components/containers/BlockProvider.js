import {Component, useState} from "react";
import {Block} from "./blocks/Block";
import {ConditionBlock} from "./blocks/ConditionBlock";
import {InOutputBlock} from "./blocks/InOutputBlock";
import {StartBlock} from "./blocks/StartBlock";
import {EndBlock} from "./blocks/EndBlock";
import {ActionBlock} from "./blocks/ActionBlock";
import {SubProgramBlock} from "./blocks/SubProgramBlock";
import {LoopBlock} from "./blocks/LoopBlock";
import '../../assets/stylesheets/Block.css'

import image_block from "../../assets/images/block.png";
import {useDrag} from "react-dnd";

const BlockList = () => {
    const [blockList, setBlockList] = useDrag([
        new StartBlock,
        new EndBlock(),
        new ActionBlock(),
        new ConditionBlock(),
        new InOutputBlock(),
        new SubProgramBlock(),
        new LoopBlock()
    ])

    const [currentCard, setCurrentCard] = useState(null)

    function dragStartHandler(e, b) {
        console.log("drag", b);
        setCurrentCard(b)
    }

    function dragLeaveHandler(e) {
        console.log(("leve handler"))
    }

    function dragEndHandler(e) {
        e.target.style.background = "white";
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = "lightgray ";
    }

    function dragDropHandler(e, b) {
        e.preventDefault()
        console.log("drag", b);
    }

    return (
        <div className={'blocks'}>
            {blockList.map(b =>
                <div ref={"drag"}
                    //когда взяли кароточку
                    onDragStart={(e) => dragStartHandler(e, b)}
                    //вышли за пределы другой карточки
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    //если отпустили перемещение
                    onDragEnd={(e) => dragEndHandler(e)}
                    //если мы над другим объектом
                    onDragOver={(e) => dragOverHandler(e)}
                    //отпустили карточку и действие по этому поводу
                    onDrop={(e) => dragDropHandler(e, b)}
                    className={"block"}
                    //карточка становится передвигаемой
                    draggable={true}>

                    {b.text}

                    <img src={b.block.image} className={"block"}/>
                </div>
            )}
        </div>
    );
}

export default BlockList;




