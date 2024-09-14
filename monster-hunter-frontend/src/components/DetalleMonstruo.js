import React from 'react';
import { useParams, Link } from 'react-router-dom';

function DetalleMonstruo({ monstruos }) {
  const { id } = useParams();
  const monstruo = monstruos.find(m => m.ID_MONSTRUO === parseInt(id));

  if (!monstruo) return <div>Cargando...</div>;

  return (
    <div className="card bg-secondary text-light">
      <div className="card-body text-center">
        <h2 className='card-title text-center'>{monstruo.NOMBRE_MONSTRUO}</h2>
        <img 
          src={`http://localhost:5000/api/monstruos/${monstruo.ID_MONSTRUO}/imagen`} 
          alt={`Imagen de ${monstruo.NOMBRE_MONSTRUO}`}
          className='img-fluid mb-2 d-block mx-auto'
        />
        <hr className="border-dark my-4" />
        <p className='card-text fw-bold'>Especie: {monstruo.TIPO_MONSTRUO}</p>
        <p className='card-text fw-bold'>Tamaño: {monstruo.TAMAÑO}</p>
        <p className='card-text fw-bold'>Nivel de amenaza: {monstruo.NIVEL_AMENAZA}</p>
        <p className='card-text fw-bold'>Rango: {monstruo.RANGO}</p>
        <p className='card-text fw-bold'>Debilidades: {monstruo.DEBILIDADES}</p>
        <p className='card-text fw-bold'>Estados: {monstruo.ESTADOS}</p>
        <p className='card-text fw-bold'>Descripción: {monstruo.DESCRIPCION_MONSTRUO}</p>
        <p className='card-text fw-bold'>Localizaciones: {monstruo.LOCALIZACION}</p>
        <p className='card-text fw-bold'>Elemento de resistencia: {monstruo.ELEMENTO_RESISTENCIA}</p>
        <Link to="/" className="btn btn-primary mt-3">Volver a la lista</Link>
      </div>
    </div>
  );
}

export default DetalleMonstruo;