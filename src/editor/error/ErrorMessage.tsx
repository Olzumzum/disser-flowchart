import {CSSProperties, FC} from "react";
import {blocksTypedSelector} from "../../hooks/blocksTypedSelector";



interface ErrorMessageProps {

}

export const ErrorMessage: FC<ErrorMessageProps> = (props) => {
    let styleErrorMessage: CSSProperties = {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        margin: "auto",
        position: "fixed",
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }


    let styleErrorMessageContent: CSSProperties = {
        padding: '0.5rem',
        margin: "auto",
        borderRadius: '12px',
        backgroundColor: 'red',
    }

    const {error} = blocksTypedSelector(state => state.blocks)
    let active: boolean

    active = error !== null;
    console.log("active " + error)
    styleErrorMessage.transform = active ? 'scale(1)' : 'scale(0)';

    if(error){
        return <div className={"errorMessage"} style={styleErrorMessage} onClick={() => {
            active = false
        }}>
            <div className={"errorMessage_content"} style={styleErrorMessageContent}
                 onClick={e => e.stopPropagation()}>
                <h3>{error}</h3>
            </div>
        </div>
    } else return null


    // return (
    //     <div className={"errorMessage"} style={styleErrorMessage} onClick={() => {
    //         active = false
    //     }}>
    //         <div className={"errorMessage_content"} style={styleErrorMessageContent}
    //              onClick={e => e.stopPropagation()}>
    //             <h3>{error}</h3>
    //         </div>
    //     </div>
    // )
}