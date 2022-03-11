import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import auth from "../../services/auth";

const NavbarLayout = ({ setIsActive, isActive }) => {
  const { user, setUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.Logout();
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-3" fixed="top">
        <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>

        {user !== null ? (
          <>
            <Nav className="ms-auto ">
              <NavDropdown
                title={
                  <span>
                    <i className="fas fa-user"></i> {user.username}
                  </span>
                }
                id="navbarScrollingDropdown"
                align={"end"}
              >
                <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                className="d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none"
                onClick={() => setIsActive(!isActive)}
              >
                <i className="fas fa-bars"></i>
              </Button>
            </Nav>
          </>
        ) : (
          <Nav className="ms-auto ">
            <Nav.Link as={Link} to="/Login">
              Login
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default NavbarLayout;
