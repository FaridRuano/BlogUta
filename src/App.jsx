import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Blog from './pages/Blog'
import Create from './pages/Create'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/Create' exact element={<Create/>}/>
          <Route path='/blog/:id' element={<Blog/>}/>      
        </Routes>      
      </BrowserRouter>
    </div>
  )
}

export default App