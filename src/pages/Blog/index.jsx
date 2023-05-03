import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './style.css'
import axios from 'axios';


const Blog = () => {
  const {id}=useParams();
  const [blog, setBlog] = useState(null)
  const [tags, setTags] = useState(null)
  const baseUrl = `https://talleresfisei.uta.edu.ec/modelsDas/models/blogs/blogs.php?id=${id}`
  
  
  useEffect(()=>{
    const requestData=async()=>{
      await axios.get(baseUrl).then(response=>{
          setBlog(response.data)
          setTags(response.data[0].tags)          
      })
    }
    requestData()
  },[])  

  

  if(!blog){
    return <EmptyList/>
  }
    
  return (
    <div>
        <Link className='blog-goBack' to='/'><span>&#8592;</span> Go Back
        </Link>
          <div className="blog-wrap">
            <header className='header-wrap'>
              <p className='blog-date'>Publicado el {blog[0].date}</p>
              <h1>{blog[0].title}</h1>            
              <span className='blog-date'>Autor/es:<span style={{fontWeight: 700, color:'black'}}> {blog[0].author} </span></span>
              <div className='blog-subCategory'>
               
                {tags.map((item,index)=>(                
                  <div key={index}><Chip label={tags[index]}/></div>                  
                ))} 

              </div>
            </header>
            <img src={`https://talleresfisei.uta.edu.ec/modelsDas/uploads/${blog[0].cover}`} alt='cover' className='blog-cover'/>              
            <div className='blog-desc'>
            <span dangerouslySetInnerHTML={{__html: blog[0].content}} />
            </div>
          </div>       
    </div>
  )
}

export default Blog