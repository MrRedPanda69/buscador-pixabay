import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListadoImgs from './components/ListadoImgs';


function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);

  useEffect(() => {

    const consultarAPI = async () => {
      if(busqueda === '') return;

      const imgPorPag = 30;
      const key = '21593270-d0bd481dc52c6a6ad715d9603';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPorPag}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular total paginas
      const calcularTotalPags = Math.ceil(resultado.totalHits / imgPorPag);
      setTotalPaginas(calcularTotalPags);

      // dar reset a la pantalla
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'auto'})
    }
    consultarAPI();

  }, [busqueda, paginaactual]);

  const paginaAnt = () => {
    const newPaginaActual = paginaactual - 1;
    if(newPaginaActual === 0) return;
    
    setPaginaActual(newPaginaActual);
  }

  const paginaSig = () => {
    const newPaginaActual = paginaactual + 1;
    if( newPaginaActual > totalpaginas) return;
    
    setPaginaActual(newPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        
        <Form 
          setBusqueda={setBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImgs 
          imagenes={imagenes}
        />

        { (paginaactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info btn-lg mr-2"
            onClick={paginaAnt}
          >&laquo; Anterior</button>
        )}

        { (paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="bbtn btn-info btn-lg ml-2"
            onClick={paginaSig}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
