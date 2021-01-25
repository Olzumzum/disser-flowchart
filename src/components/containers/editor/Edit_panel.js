import {Col} from "react-bootstrap";


function Edit_panel({children}){

        return (
            // <Col >sm={9} className={"bg-warning"}
            <Col className={"bg-warning"} >
                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    {children}
                </div>

            </Col>
        )
}

export default Edit_panel;