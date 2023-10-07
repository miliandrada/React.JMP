import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import estis from "../Css/NavBar.module.css";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

function NavBar({ login }) {
  const context = useContext(AuthContext);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Celulares
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={estis.rutas_nav} as={Link} to="/">
              Inicio
            </Nav.Link>

            {!context.login && (
              <>
                <Nav.Link className={estis.rutas_nav} as={Link} to="/alta">
                  Registro
                </Nav.Link>
                <Nav.Link className={estis.rutas_nav} as={Link} to="/ingresar">
                  Iniciar Sesión
                </Nav.Link>
              </>
            )}
            {context.login && (
              <>
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    className={estis.rutas_nav}
                    as={Link}
                    to="/productos/alta"
                  >
                    Registre su producto
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  className={estis.rutas_nav}
                  onClick={context.handlerLogout}
                >
                  Salir
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {context.login && (
          <div className={estis.rutas_nav}> {context.user.name}</div>
        )}
      </Navbar>
    </div>
  );
}
export default NavBar;
