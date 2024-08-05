//Imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Carrito from "./views/Carrito";
import Pizza from "./views/Pizza";
import Home from "./views/Home";
import './App.css';

//Import Context
import { PizzasProvider } from "./context/MyContext";

const App = () => {
  return (
    <PizzasProvider> 
        <Navbar />
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/pizza/:id" element={<Pizza />} /> 
          <Route path="/carrito" element={<Carrito />} /> 
        </Routes>
    </PizzasProvider>
  );
};

export default App;