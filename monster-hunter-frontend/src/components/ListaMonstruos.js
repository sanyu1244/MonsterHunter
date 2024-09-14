import React from 'react';
import { Link } from 'react-router-dom';



function ListaMonstruos({ monstruos }) {

  const renderStars = (nivel) => {
    const stars = [];
    for (let i = 0; i < nivel; i++) {
      stars.push(
        <img 
          key={i}
          src={`${process.env.PUBLIC_URL}/img/star.png`}
          alt="⭐" // por si no se carga la imagen correctamente hay un emoji en el alt como backup 
          style={{ width: '20px', height: '20px', marginRight: '2px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.alt = '⭐';
            e.target.style.display = 'inline';
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="row gx-4">
      <h2 className="text-center mb-4">Monstruos de Monster Hunter</h2>
      {monstruos.map((monstruo) => (
        <div className="col-md-6 col-lg-4 mb-4" key={monstruo.ID_MONSTRUO}>
          <div className="card bg-secondary text-light h-100">
            <div className="card-body">
              <Link to={`/monstruo/${monstruo.ID_MONSTRUO}`} className="text-light text-decoration-none">
                <h2 className='card-title text-center'>{monstruo.NOMBRE_MONSTRUO}</h2>
                <img 
                  src={`http://localhost:5000/api/monstruos/${monstruo.ID_MONSTRUO}/imagen`} 
                  alt={`Imagen de ${monstruo.NOMBRE_MONSTRUO}`}
                  className='img-fluid mb-2 d-block mx-auto'
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/img/monstruos/default.png'
                  }}
                />
              </Link>
              <p className='card-text fw-bold'>Especie: {monstruo.TIPO_MONSTRUO}</p>
              <p className='card-text fw-bold'>
                Nivel de amenaza: {monstruo.NIVEL_AMENAZA}
                <span className="d-block mt-1">
                  {renderStars(monstruo.NIVEL_AMENAZA)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaMonstruos;