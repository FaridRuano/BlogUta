import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './style.css'
import axios from 'axios';
import {decode} from 'html-entities';


const Blog = () => {
  const id=useParams();
  const [blog, setBlog] = useState(null)
  const [tags, setTags] = useState(null)
  const baseUrl = 'http://localhost:8080/modelsDas/models/blogs/blogs.php'
  
  
  useEffect(()=>{
    const requestData=async()=>{
      await axios.get(baseUrl,id).then(response=>{
          setBlog(response.data);
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
                  <div key={index}><Chip label={blog[0].tags[index].tag}/></div>                  
                ))} 

              </div>
            </header>
            <img src={`http://localhost:8080/modelsDas/uploads/${blog[0].cover}`} alt='cover' className='blog-cover'/>              
            <div className='blog-desc'>
            <span dangerouslySetInnerHTML={{__html: blog[0].content}} />
            </div>
          </div>       
    </div>
  )
}

export default Blog