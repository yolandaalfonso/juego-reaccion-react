//import { useState } from 'react'
import './App.css'
import Juego from './components/juego/Juego'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <h1>Juego de reacción ⏳🎯</h1>
      <p>Cuando el cuadrado de ponga amarillo, haz clic lo más rápido posible💥</p>
      <Juego></Juego>
    </>
  )
}

export default App
