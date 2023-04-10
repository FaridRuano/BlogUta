import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import QuillEditor from '../../components/Create/Quill';
import TagsComponent from '../../components/Create/Tags';

const Create = () => {

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
		autor: '',
		title: '',
	  });

    const handleChange=e=>{		
		const{name, value}=e.target;
		setSelectedBlog((prevState)=>({
			...prevState,
			[name]: value,
		}))		
        console.log(selectedBlog)
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

    const requestPost=async()=>{	
        let validate = validatePass();
			
		if(!validate){					
			routeChange();
		}
	}

    const [quillContent, setQuillContent] = useState("");

    function handleQuillChange(content) {
        setQuillContent(content);
        console.log(quillContent)
    }

    const initialTags = [
        'UI/UX',
        'Javascript',
    ]
    
    const [tags, setTags] = useState(initialTags);

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

  return (
    <div>
        <Link className='create-goBack' to='/'><span>&#8592;</span> Go Back
        </Link>

        <div className='create-warp'>
            <div className='createInput-warp'>
                <label>Clave</label>
                <input 
                    type='text'                   
                    name='password'
                    onChange={handleChange}
                />
            </div>
            <div className='createInput-warp'>
                <label>Autores</label>
                <input 
                    type='text'
                    name="autor"
                    onChange={handleChange}
                />
            </div>                
            <div className='createInput-warp'>
                <label>Titulo</label>
                <input 
                    type='text'
                    name="title"
                    onChange={handleChange}
                />
            </div>     
            <div className='createInput-warp'>
                <label>Portada</label>
                <input 
                    onChange={handleImageChange}
                    type='file'
                />
            </div>                            
            <div className=''>
                <QuillEditor value={quillContent} onChange={handleQuillChange}/>
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