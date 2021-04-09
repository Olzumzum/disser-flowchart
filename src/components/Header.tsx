import {Container, Nav, Navbar} from "react-bootstrap";
import {Component} from "react";
import {Route, Switch, BrowserRouter as Router, Link} from "react-router-dom";
import Home from "../pages/Home";
import Help from "../pages/Help";
import File_s from "../pages/File_s";

/**
 * Шапка сервиса,
 * здесь перечислены все возможные ссылочки сайта, оформлена шапочка
 */
export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand={"md"} bg={"dark"} variant={"dark"}>
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                // src={logo}
                                height={30}
                                width={30}
                                className="d-line-block align-top"
                                alt="Logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={"responsive-navbar-nav"}/>
                        <Navbar.Collapse id={"responsive-navbar-nav"}>
                            <Nav className={"mr-auto"}>
                                <Nav.Link href={"/"}>Home</Nav.Link>
                                <Nav.Link href={"/file"}>File</Nav.Link>
                                <Nav.Link href={"/help"}>Help</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Router>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route exact path={"/file"} component={File_s}/>
                        <Route exact path={"/help"} component={Help}/>
                    </Switch>
                </Router>
            </>
        );
    }
}