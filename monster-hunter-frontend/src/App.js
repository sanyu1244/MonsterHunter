import React, { useState, useEffect } from 'react';
import {Routes, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CustomDarkTheme.css';
import ListaMonstruos from './components/ListaMonstruos';
import DetalleMonstruo from './components/DetalleMonstruo';
import Buscador from './components/Buscador';
import Mapas from './components/Mapas';
import Armas from './components/Armas';
// import Armaduras from './components/Armaduras';
import Navbar from './components/Navbar';
import sunbreak from './assets/img/sunbreak.png';


function MonstruosApp() {
  const [monstruos, setMonstruos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMonstruos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/monstruos');
        setMonstruos(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchMonstruos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMonstruos = monstruos.filter(monstruo =>
    monstruo.NOMBRE_MONSTRUO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monstruo.TIPO_MONSTRUO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monstruo.DEBILIDADES.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className='bg-dark text-light min-vh-10'>
        
        <div className="container py-4">
          <img className="img-fluid mx-auto d-block" src={sunbreak} alt='logo de la pagina '/>
       
          <Navbar />

             <Routes>
                <Route path="/" element={
                <>
                  <Buscador searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                  <ListaMonstruos monstruos={filteredMonstruos} />
                </>
              } />
            <Route path="/monstruo/:id" element={<DetalleMonstruo monstruos={monstruos} />} />
            <Route path='/mapas' element={<Mapas/>}/>
            <Route path='/armas' element={<Armas/>}/>
        </Routes>
        </div>
      </div>
  );
}

export default MonstruosApp;