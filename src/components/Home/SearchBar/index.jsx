import React from 'react'
import './styles.css'
import { FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SearchBar = ({value, handleSearchKey, clearSearch, formSubmit}) => {
  return (
    <div className='bar-wrap'>
      <div className="searchBar-wrap">
          <form onSubmit={formSubmit}>
              <input 
                  type="text"
                  onChange={handleSearchKey}
                  placeholder="Busca por Categoria"
                  value={value}
              />
              {value && <span onClick={clearSearch}>
                <FaTimesCircle className='searchBar-cancel'/>              
              </span>}
              <button className='bar-button'>Buscar</button>
          </form>        
      </div>
      <div className='createButton-wrap'>
        <Link to='/create'>
          <button className='bar-button secondary'>Postear</button>
        </Link>
      </div>
    </div>

  )
}

export default SearchBar