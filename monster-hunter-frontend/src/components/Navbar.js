// src/components/Navbar.js
import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"/>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/" end>Monstruos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mapas">Mapas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mapas">Armaduras</NavLink> {/* completar la ruta con react que aun no esta creada y donde esta mapas tendria que ir Armadura que hace referencia al correcto */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mapas">Armas</NavLink>  {/* completar la ruta con react que aun no esta creada y aqui lo mismo que armadura pero con las armas */}
            </li>
            {/* Puedes agregar más enlaces aquí */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;