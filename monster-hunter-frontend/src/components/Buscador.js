import React from 'react';

function Buscador({ searchTerm, handleSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar monstruos..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="form-control mb-4 bg-dark text-light"
    />
  );
}

export default Buscador;