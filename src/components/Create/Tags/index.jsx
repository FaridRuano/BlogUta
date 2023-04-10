import React, { useState } from 'react';
import './style.css'
import { FaPlus } from "react-icons/fa";

const TagsComponent = ({tags, setTags}) => {
    
    const [newTag, setNewTag] = useState('');
  
    const handleAddTag = (event) => {
      event.preventDefault();
      if (newTag.trim() !== '' && tags.length < 5) {
        setTags([...tags, newTag.trim()]);
        setNewTag('');
      }
    };
  
    const handleDeleteTag = (tagToDelete) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
    };
  
    const handleInputChange = (event) => {
      setNewTag(event.target.value);
      console.log(tags)
    };
  
    return (
      <div>
        <form>
          <label>Categorias</label>
          <input type="text" value={newTag} placeholder='Maximo 5' onChange={handleInputChange} />
          <FaPlus onClick={handleAddTag}/>
        </form>
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button onClick={() => handleDeleteTag(tag)}>x</button>
          </span>
        ))}
      </div>
    );
  };
  
  export default TagsComponent;