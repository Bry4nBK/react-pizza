import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { PizzasContext } from "../context/MyContext";

const useCarrito = () => {
  const { carrito, getCarritoTotal } = useContext(PizzasContext);
  const total = getCarritoTotal();

  const formattedTotal = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(total);

  return { carrito, formattedTotal };
};

const NavbarComponent = () => {
  const { formattedTotal } = useCarrito();

  return (
    <Navbar bg="info" variant="dark" expand="lg">
      <Container>
        <Brand />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Cart formattedTotal={formattedTotal} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Brand = () => (
  <LinkContainer to="/">
    <Navbar.Brand>🍕 Pizzería Mamma Mia!</Navbar.Brand>
  </LinkContainer>
);

const Cart = ({ formattedTotal }) => (
  <LinkContainer to="/carrito">
    <Nav.Link className="d-flex align-items-center text-dark font-weight-bold">
      <span className="mr-2">🛒</span>
      <span>{formattedTotal}</span>
    </Nav.Link>
  </LinkContainer>
);

export default NavbarComponent;
