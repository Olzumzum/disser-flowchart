import {CSSProperties, FC} from "react";

/**
 * Компонент для вывода результата работы компилятора
 */
const styles: CSSProperties = {
    width: '100%',
    height: 150,
    border: '1px solid black',
    margin: '10px',
    padding: '20px'
}


export const CompilerOutputConsole: FC= () => {
    //переменная для записи результата
    let result: string | null = null
    //вам надо, видимо, какую-то функцию для подгрузки результатов
    //подозрения, что асинхронную


    return (
            <div style={styles}>
                Вводите сюда текст
                {result}
            </div>
    )
}