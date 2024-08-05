import React, { useContext } from "react";
import { PizzasContext } from "../context/MyContext";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { pizzas, addToCarrito } = useContext(PizzasContext);
  const navigate = useNavigate();

  const handleAddToCart = (pizzaId) => addToCarrito(pizzaId);

  const viewPizzaDetails = (pizzaId) => navigate(`/pizza/${pizzaId}`);

  const renderPizzaCard = ({ id, img, name, ingredients, price }) => (
    <Col key={id} md={4} lg={3}>
      <Card className="h-100">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <hr />
            <h6>Ingredientes:</h6>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <hr />
          </Card.Text>
          <h4 className="price text-muted">
            {new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
              minimumFractionDigits: 0,
            }).format(price)}
          </h4>
          <div className="d-flex justify-content-evenly button-group">
            <Button variant="info" size="sm" onClick={() => viewPizzaDetails(id)}>
              Ver Más 👀
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleAddToCart(id)}>
              Añadir 🛒
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <Container>
      <h1 className="text-center my-4">¡Pizzería Mamma Mia!</h1>
      <h5 className="text-center my-4">¡Tenemos las mejores pizzas que podrás encontrar!</h5>
      <hr />
      <Row xs={1} md={3} className="g-4">
        {pizzas.map(renderPizzaCard)}
      </Row>
    </Container>
  );
};

export default Home;
