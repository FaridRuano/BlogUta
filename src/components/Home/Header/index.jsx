import React from 'react'
import './styles.css'


const Header = () => {
  return (
    <header className='home-header'>
        <h2> BLOG DE CONOCIMIENTOS </h2>
        <h1>
            <span>"</span> DESARROLLO ASISTIDO POR SOFTWARE <span>"</span>            
        </h1>
        <div className="sigles-container">
          <span className="home-sigles">D.A.S</span>
        </div>
        <p>
        Encuentra información de herramientas que apoyan en el proceso de 
        desarrollo de software. Publicaciones desarrolladas por estudiantes
        de Séptimo Semestre de la Carrera de Software en el 
        <br/>
        Periodo Académico Abril-Septiembre 2023.
        </p>
    </header>
  )
}

export default Header