import {useState} from "react";

const Block = () => {
    const [blockList, setBlockList] = useState([
        {id: 0, order: 3, text: "Блок-условие"},
        {id: 1, order: 0, text: "Блок-ввода/вывода"},
        {id: 2, order: 2, text: "Блок"},
    ])

    const [currentCard, setCurrentCard] = useState(null)

    function dragStartHandler(e, b) {
        console.log("drag", b);
        setCurrentCard(b)
    }

    function dragLeaveHandler(e) {
        return undefined;
    }

    function dragEndHandler(e) {
        e.target.style.background = "white"
    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = "lightgray "
    }

    function dragDropHandler(e, b) {
        e.preventDefault()
        console.log("drag", b);
    }

    return (
        <div className={'blocks'}>
            {blockList.map(b =>
                <div
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
                </div>
            )}
        </div>
    );
};

export default Block;