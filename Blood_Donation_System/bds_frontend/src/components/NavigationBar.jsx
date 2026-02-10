import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './nav.css';
import Button from 'react-bootstrap/Button';
import { getToken, removeToken } from '../services/TokenServices';
import { getRole, removeRole } from '../services/RoleServices';

export function NavigationBar() {
  const navigate = useNavigate();
  const token = getToken(); // check if user is logged in
  const role = getRole();   // get role: admin or donor

  const handleLogout = () => {
    removeToken();
    removeRole();
    localStorage.removeItem("user_id");
    navigate("/Login");
  };

  return (
    <Navbar
      expand="lg" // ✅ makes it responsive (collapses on small screens)
      style={{ backgroundColor: '#FFFFFF' }}
      data-bs-theme="light"
      className="shadow-sm py-2"
    >
      <Container fluid>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://i.postimg.cc/CKWtcfZd/imgblood.png"
            alt="Logo"
            style={{
              height: '50px',
              width: 'auto',
              marginRight: '10px',
            }}
          />
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-danger nav-font"
            style={{
              fontWeight: '540',
              fontSize: '28px',
              whiteSpace: 'nowrap',
            }}
          >
            Bloodtopia
          </Navbar.Brand>
        </div>

        {/* ✅ Added toggle for mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
          style={{ outline: 'none' }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center text-center text-lg-start">
            <Nav.Link
              as={Link}
              to="/"
              className="text-danger nav-font"
              style={{ fontWeight: '400', fontSize: '18px' }}
            >
              Welcome
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Home"
              className="text-danger nav-font"
              style={{ fontWeight: '400', fontSize: '18px' }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Contact"
              className="text-danger nav-font"
              style={{ fontWeight: '400', fontSize: '18px' }}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/About"
              className="text-danger nav-font"
              style={{ fontWeight: '400', fontSize: '18px' }}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/SearchAvailability"
              className="text-danger nav-font"
              style={{ fontWeight: '400', fontSize: '18px' }}
            >
              Check Availability
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Gallery"
              className="text-danger nav-font"
              style={{ fontWeight: '400', fontSize: '18px' }}
            >
              Gallery
            </Nav.Link>

            {/* ✅ Conditional Rendering (unchanged) */}
            {!token && (
              <Link
                to="/Login"
                className="btn btn-danger mt-2 mt-lg-0"
                style={{ fontSize: '18px', marginLeft: '10px' }}
              >
                Login
              </Link>
            )}

            {token && role === 'donor' && (
              <>
                <Nav.Link
                  as={Link}
                  to="/Donate"
                  className="text-danger nav-font"
                  style={{ fontWeight: '400', fontSize: '18px' }}
                >
                  Donate
                </Nav.Link>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="mt-2 mt-lg-0"
                  style={{ fontSize: '18px', marginLeft: '10px' }}
                >
                  Logout
                </Button>
              </>
            )}

            {token && role === 'admin' && (
              <>
                <Nav.Link
                  as={Link}
                  to="/Dashboard"
                  className="text-danger nav-font"
                  style={{ fontWeight: '400', fontSize: '18px' }}
                >
                  Dashboard
                </Nav.Link>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="mt-2 mt-lg-0"
                  style={{ fontSize: '18px', marginLeft: '10px' }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

