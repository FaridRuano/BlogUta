import React, { useState } from 'react';
import './style.scss'
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
    };
  
    return (
      <div className='tags__wrap'>
        <div className='tags__field__wrap'>
          <input className='tags_field' id='tag' type="text" value={newTag} placeholder='Maximo 5' onChange={handleInputChange} />
          <label className='tag_label'>Categorias</label>
          <FaPlus onClick={handleAddTag} className='tag__add'/>
        </div>
        <div className='tags__tags__wrap'>
        {tags.map((tag) => (
          <span className='tags__tags__wrap__span' key={tag}>
            {tag}
            <span className='tags__cancel' onClick={() => handleDeleteTag(tag)}>X</span>
          </span>
        ))}
        </div>        
      </div>
    );
  };
  
  export default TagsComponent;