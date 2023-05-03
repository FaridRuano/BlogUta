import React from 'react'
import './style.scss'

const Footer = () => {
  return (
    <div className='footer-warp'>
        <div className='footer-uta'>
            <span>Universidad Técnica de Ambato - <span className='bold'>Carrera de Ingeniería en Software</span></span>
        </div>
        <div className='footer-author'>
            <span className='author-name'>Hecho por <span className='bold'>Farid Ruano</span></span>
            <span className='author-rights'>All rights reserved 2023.</span>
        </div>
    </div>
  )
}

export default Footer