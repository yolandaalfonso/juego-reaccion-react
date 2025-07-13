import React from 'react';

const BotonJuego = ({ estado, onClick, texto }) => {
  return (
    <button
      onClick={onClick}
      className={`boton-juego ${estado === 'amarillo' ? 'amarillo' : 'rojo'}`}
    >
      {texto}
    </button>
  );
};

export default BotonJuego;