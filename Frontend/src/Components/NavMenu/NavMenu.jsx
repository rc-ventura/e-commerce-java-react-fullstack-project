import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavMenu() {
  
  
  return (

    <div>
     <Navbar bg="dark"  data-bs-theme="dark"  expand='xxl' className="bg-body-tertiary mb-3" >
          <Container fluid>
            
            <Navbar.Brand  href="/home">
            <img
              src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
              alt="Your Logo"
              width="30"
              height="30"
              className="d-inline-block align-top"
              
            />
              
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
              placement="end"
            >
              
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                <img
              src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
              alt="Your Logo"
              width="80"
              height="80"
              className="d-inline-block align-top"
            />
                </Offcanvas.Title>
                
              </Offcanvas.Header>
              
              <Offcanvas.Body>
              <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-primary">Search</Button>
                </Form> 
                                
                
                
                <Nav className="justify-content-end flex-grow-1 pe-5">
                  
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="#action2">Login</Nav.Link>
                  <Nav.Link href="#action2">Register</Nav.Link>
                  <Nav.Link href="#action2">About</Nav.Link>
                  <Nav.Link href="#action2">Contact</Nav.Link>

                  <NavDropdown 
                    title="Admin"
                    id={`offcanvasNavbarDropdown-expand-lxxlg`}
                    className='me-4'
                  >
                    <NavDropdown.Item href="/addProduct">Add Product</NavDropdown.Item>
                    <NavDropdown.Item href="/addCategory"> Add Category</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
           
          </Container>
        </Navbar>
    </div>
  )
}
