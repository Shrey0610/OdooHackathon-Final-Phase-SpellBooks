import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import BookDetails from './components/BookDetails';


// Navbar component
function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-body">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/path/to/your/logo.png" className="logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/book-details">Explore</Nav.Link>
            {/* Add more Nav.Link components as needed */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



// App component
function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="header2" style={{ height: 2 }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-details" element={<BookDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}


// Example Home component
function Home() {
  return (
    <div>
     <div className="container my-5" >
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
        Are you curious and want to read something? Well you're at the write place 🤔
        </h1>
        <p className="lead" style= {{paddingTop: 10}}>
          Put your thinking caps on!!
        </p>
        <br />
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <a href= "/about">
          <button
            type="button"
            className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
          >
             About Mobius
          </button></a>

        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg" style={{ marginLeft: '10px', marginTop: '-45px' }}>
  <img
    className="rounded-lg-3"

    alt=""
    style={{ width: 600 }}
  />
</div>


    </div>
  </div>
    </div>
  );
}

export default App;
