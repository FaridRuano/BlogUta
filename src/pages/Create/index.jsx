import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import QuillEditor from '../../components/Create/Quill';
import TagsComponent from '../../components/Create/Tags';
import { FaCameraRetro } from 'react-icons/fa';

const Create = () => {
	const baseUrl = "http://localhost:8080/modelsDas/models/blogs/blogs.php";
	const passwordsUrl = "http://localhost:8080/modelsDas/models/passwords/passwords.php";

    const history = useNavigate();
    const [passwords, setPasswords] = useState([]);	
 
    const requestPasswords=async()=>{
        await axios.get(passwordsUrl).then(response=>{
            setPasswords(response.data);
        })
    }

    const [selectedBlog, setSelectedBlog] = useState({
        password: '',
		author: '',
		title: '',
        summary: '',
	  });

    const handleChange=e=>{		
		const{name, value}=e.target;
		setSelectedBlog((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}

    useEffect(()=>{
        requestPasswords();
    },[])

    const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/`);
	};

    function validatePass(){
        let pass = selectedBlog.password;
		let key = passwords.some(value => value.password === pass);
        return !key
    }    

    const [quillContent, setQuillContent] = useState("");

    function handleQuillChange(content) {
        setQuillContent(content);
    }

    const initialTags = [
        'UI/UX',
        'Javascript',
    ]
    
    const [tags, setTags] = useState(initialTags);

    const [cover, setCover] = useState(null);

    const handleCoverChange = (e) => {
        setCover(e.target.files[0]);
      };

    const requestPost=async()=>{	
        let validate = validatePass()
            
        if(!validate){					
            try{
                const formData = new FormData()
                formData.append("METHOD", 'ADD')
                formData.append("author", selectedBlog.author)
                formData.append("title", selectedBlog.title)             
                formData.append("summary", selectedBlog.summary)             
                formData.append("pass_word", selectedBlog.password)             
                formData.append("cover", cover)
                formData.append("content", quillContent)
                formData.append("tags", tags)
                axios.post(baseUrl, formData)
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
            }catch(err){
                console.log(err)                
            }
            routeChange()
        }
	}

  return (
    <div>
        <Link className='create-goBack' to='/'><span>&#8592;</span> Go Back
        </Link>

        <div className='create-warp'>
            <div className='form__inline'>
            <div className='form__group field'>            
                <input 
                    className='form__field'
                    type='text'                   
                    name='password'
                    id='password'
                    onChange={handleChange}
                    maxLength={49}
                    placeholder='Clave de Pub.'
                />
                <label className='form__label' for='password'>Clave de Pub.</label>
            </div>
            <div className='form__group field'>
                <input 
                    className='form__field'
                    type='text'
                    name="author"
                    id='author'
                    onChange={handleChange}
                    maxLength={49}
                    placeholder='Autores'
                />
                <label className='form__label' for='author'>Autores</label>

            </div>     
            </div>    

            <div className='form__group field'>
                <input 
                    className='form__field'
                    type='text'
                    name="title"
                    id="title"
                    onChange={handleChange}
                    maxLength={49}
                    placeholder='Titulo'
                />
                <label className='form__label' for='title'>Titulo</label>

            </div>             
            <div className='form__group field area'>                
                <input 
                    className='form__field'
                    type='text'
                    name="summary"
                    onChange={handleChange}
                    maxLength={249}
                    placeholder='Introduccion'
                />
                <label className='form__label' for='cover'>Introduccion</label>

            </div>                             
            <div className=''>
                <QuillEditor value={quillContent} onChange={handleQuillChange}/>
            </div>
            <div className='form__file__field'>
                <input 
                    className='form__file'
                    onChange={handleCoverChange}
                    type='file'
                    id="cover"
                    placeholder='Portada'
                />
                <label className='form__file__icon' for='cover'>Insertar Portada <FaCameraRetro/></label>
            </div> 
            <div>
                <TagsComponent tags={tags} setTags={setTags}/>
            </div>            
            <div className='Button-post'>
                <button className='create-button' onClick={()=>requestPost()}>
                    Publicar
                </button>

            </div>            
        </div>
    </div>
  )
}

export default Create