import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './css/Navbar.css';

//  la barra de navegacion de la aplicacion 
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
              <NavLink className="nav-link" to="/Armaduras">Armaduras</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Armas">Armas</NavLink> 
            </li>
            {/* Puedes agregar más enlaces aquí */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;