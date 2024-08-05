// Pizza.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PizzasContext } from '../context/MyContext';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const IngredientsList = ({ ingredients }) => (
  <ul className="pizza-ingredients-list">
    {ingredients.map((ingredient, index) => (
      <li key={index} className="pizza-ingredient-item">
        {capitalize(ingredient)}
      </li>
    ))}
  </ul>
);

const PriceAndButton = ({ price, onAddToCart }) => (
  <div className="price-and-button-container">
    <h1 className="price-text">
      Precio: {new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      }).format(price)}
    </h1>
    <Button 
      variant="danger"
      className="add-to-cart-button" 
      onClick={onAddToCart}
    >
      Añadir
    </Button>
  </div>
);

const PizzaDetailCard = ({ pizza, onAddToCart }) => (
  <Card className="pizza-detail-card">
    <Card.Img variant="top" src={pizza.img} className="pizza-detail-image" />
    <Card.Body className="pizza-detail-body">
      <Card.Title as="h2">{capitalize(pizza.name)}</Card.Title>
      <hr />
      <Card.Text>{pizza.desc}</Card.Text>
      <IngredientsList ingredients={pizza.ingredients} />
      <PriceAndButton price={pizza.price} onAddToCart={onAddToCart} />
    </Card.Body>
  </Card>
);


const Pizza = () => {
  const { pizzas, addToCarrito } = useContext(PizzasContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const pizza = pizzas.find((p) => p.id.toString() === id);

  if (!pizza) {
    return <div>Pizza no encontrada</div>;
  }

  const handleAddToCartClick = () => {
    addToCarrito(pizza.id);
    navigate('/carrito');
  };

  return (
    <div className="pizza-detail-container">
      <PizzaDetailCard pizza={pizza} onAddToCart={handleAddToCartClick} />
    </div>
  );
};

export default Pizza;
