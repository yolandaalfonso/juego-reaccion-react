// components/Juego.jsx
import React, { useState } from 'react';
import './Juego.css';
import BotonJuego from '../boton/Boton';

const Juego = () => {
  // Estados del juego
  const [estadoJuego, setEstadoJuego] = useState('esperando');
  const [tiempoReaccion, setTiempoReaccion] = useState(null);
  const [tiempoInicioAmarillo, setTiempoInicioAmarillo] = useState(null);
  const [mejoresTiempos, setMejoresTiempos] = useState([]);
  const [modoDificil, setModoDificil] = useState(false);
  const [mensaje, setMensaje] = useState('');


  const iniciarJuego = () => {
    setEstadoJuego('listo');
    setTiempoReaccion(null);
    setMensaje('Espera... El cuadro se pondrá amarillo');
    
    // Tiempo aleatorio entre 3-7 segundos
    const tiempoAleatorio = Math.random() * 4000 + 3000;
    
    setTimeout(() => {
      setEstadoJuego('amarillo');
      setTiempoInicioAmarillo(Date.now());
      setMensaje('¡AHORA! ¡Haz clic rápido!');
      
      // Modo difícil:
      if (modoDificil) {
        setTimeout(() => {
          if (estadoJuego === 'amarillo') {
            setEstadoJuego('terminado');
            setMensaje('¡Muy lento! Inténtalo de nuevo');
          }
        }, 1000);
      }
    }, tiempoAleatorio);
  };

  const manejarClic = () => {
    if (estadoJuego === 'amarillo') {
      const tiempoClic = Date.now();
      const reaccion = tiempoClic - tiempoInicioAmarillo;
      
      setTiempoReaccion(reaccion);
      setEstadoJuego('terminado');
      setMensaje(`¡Excelente! Tu tiempo: ${reaccion}ms`);
      
      // Actualizar ranking
      const nuevoRanking = [...mejoresTiempos, reaccion]
        .sort((a, b) => a - b)
        .slice(0, 5);
      setMejoresTiempos(nuevoRanking);
      
    } else if (estadoJuego === 'listo') {
      setEstadoJuego('terminado');
      setMensaje('¡Muy temprano! Espera a que se ponga amarillo');
    }
  };

  // Texto del botón
  const obtenerTextoBoton = () => {
    switch(estadoJuego) {
      case 'esperando':
        return 'Iniciar Juego';
      case 'listo':
        return 'Esperando...';
      case 'amarillo':
        return '¡CLIC AHORA!';
      case 'terminado':
        return 'Jugar de Nuevo';
      default:
        return 'Iniciar Juego';
    }
  };

  const manejarClicBoton = () => {
    if (estadoJuego === 'esperando' || estadoJuego === 'terminado') {
      iniciarJuego();
    } else {
      manejarClic();
    }
  };

  return (
    <div className="juego-container">
      <div className="juego-card">
        

        {/* Mensaje de estado */}
        {mensaje && (
          <div className="mensaje-estado">
            {mensaje}
          </div>
        )}

        {/* BOTÓN DEL JUEGO */}
        <div className="boton-container">
          <BotonJuego
              estado={estadoJuego}
              onClick={manejarClicBoton}
              texto={obtenerTextoBoton()}
            />
        </div>

        {/* Nivel dificil */}
        <div className="dificultad-selector">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={modoDificil}
              onChange={(e) => setModoDificil(e.target.checked)}
              className="checkbox-input"
            />
            <span>Modo Difícil (1 segundo límite)</span>
          </label>
        </div>

        {/* Ranking */}
        {mejoresTiempos.length > 0 && (
          <div className="ranking">
            <h3 className="ranking-titulo">🏆 Mejores Tiempos</h3>
            <ul className="ranking-lista">
              {mejoresTiempos.map((tiempo, index) => (
                <li key={index} className="ranking-item">
                  <span>#{index + 1}</span>
                  <span>{tiempo}ms</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setMejoresTiempos([])}
              className="boton-limpiar"
            >
              Limpiar Ranking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Juego;