import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PizzasContext } from '../context/MyContext';
import { Container, ListGroup, Button, Row, Col, Badge, Image } from 'react-bootstrap';

const Carrito = () => {
  const { carrito, getCarritoTotal, removeFromCarrito, addToCarrito } = useContext(PizzasContext);
  const navigate = useNavigate();

  const total = getCarritoTotal();

  const updateQuantity = (pizzaId, action) => {
    if (action === 'increase') {
      addToCarrito(pizzaId);
    } else if (action === 'decrease') {
      removeFromCarrito(pizzaId);
    }
  };

  const handleCheckout = () => {
    navigate('/pago');
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Detalles del pedido:</h2>
      <ListGroup className="my-3">
        {carrito.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center list-group-item-custom">
            <Image src={item.img} width={64} height={64} rounded />
            <div className="flex-grow-1 mx-3">{item.name}</div>
            <div className="flex-shrink-0 mx-3 price">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(item.price)}
            </div>
            <div className="flex-shrink-0 d-flex align-items-center">
              <Button variant="outline-danger" size="sm" onClick={() => updateQuantity(item.id, 'decrease')} className="btn-quantity">
                –
              </Button>
              <Badge bg="secondary" className="mx-2 badge-quantity">{item.quantity}</Badge>
              <Button variant="outline-primary" size="sm" onClick={() => updateQuantity(item.id, 'increase')} className="btn-quantity">
                +
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row className="justify-content-end total-row">
        <Col xs={12} md={6}>
          <div className="total-price">
            <span className="text-total">Total:</span> 
            <span className="amount">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(total)}
            </span>
          </div>
          <Button variant="primary" size="lg" onClick={handleCheckout} className="mt-3 btn-checkout">
            Ir a Pagar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
