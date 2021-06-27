import React, { useState } from 'react';
import Error from './Error';

const Form = ({setBusqueda}) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImgs = e => {
        e.preventDefault();

        // Validar
        if(termino.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // enviar termino de busqueda al main component
        setBusqueda(termino);
    }

    return (
        <form
            onSubmit={buscarImgs}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agrega un término de búsqueda"/> : null}
        </form>
    );
}

export default Form;