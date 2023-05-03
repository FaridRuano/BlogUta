import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import QuillEditor from '../../components/Create/Quill';
import TagsComponent from '../../components/Create/Tags';
import { FaCameraRetro } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
	const baseUrl = "https://talleresfisei.uta.edu.ec/modelsDas/models/blogs/blogs.php";
	const passwordsUrl = "https://talleresfisei.uta.edu.ec/modelsDas/models/passwords/passwords.php";

    const history = useNavigate();
    const [passwords, setPasswords] = useState([]);	
    const [coverExists, setCoverExists] = useState(false);
 
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
        content: '',
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
		history(`${process.env.PUBLIC_URL}../`)
	};

    function validatePass(){
        let pass = selectedBlog.password
        if(pass.length>1){
            let key = passwords.some(value => value.password === pass)
            if(!key){
                toast.error("Contraseña no es valida",{pauseOnHover:false,theme:"dark"});
                return true
            }else{
                return false
            }
        }else if(pass.length==0){
            toast.error("Contraseña incompleta",{pauseOnHover:false,theme:"dark"});
            return true
        }
        return true
    }     

    function validateFields(){
        if(selectedBlog.author.length < 3){
            toast.error("Autor incompleto",{pauseOnHover:false,theme:"dark"})
            return true
        }
        if(selectedBlog.title.length < 3){
            toast.error("Titulo incompleto",{pauseOnHover:false,theme:"dark"})
            return true
        }
        if(selectedBlog.summary.length < 3){
            toast.error("Introduccion incompleta",{pauseOnHover:false,theme:"dark"})
            return true
        }
        if(selectedBlog.content.length < 10){
            toast.error("Contenido incompleto",{pauseOnHover:false,theme:"dark"})
            return true
        }                
        if(cover==null){
            toast.error("No existe portada",{pauseOnHover:false,theme:"dark"});
            return true
        }
        return false        
    }

    const [quillContent, setQuillContent] = useState("");

    function handleQuillChange(content) {
        setQuillContent(content)
    }

    const initialTags = [
        'UI/UX',
        'Javascript',
    ]
    
    const [tags, setTags] = useState(initialTags);

    const [cover, setCover] = useState(null);

    const handleCoverChange = (e) => {
        setCover(e.target.files[0])
        setCoverExists(true)
      };

    const requestPost=async()=>{	
        if(!validatePass()){
            if(!validateFields()){					
                try{
                    const formData = new FormData()
                    formData.append("METHOD", 'ADD')
                    formData.append("author", selectedBlog.author)
                    formData.append("title", selectedBlog.title)             
                    formData.append("summary", selectedBlog.summary)             
                    formData.append("pass_word", selectedBlog.password)             
                    formData.append("cover", cover)
                    /* formData.append("content", quillContent) */
                    formData.append("content", selectedBlog.content)
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
                <label className='form__label' htmlFor='password'>Clave de Pub.</label>
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
                <label className='form__label' htmlFor='author'>Autores</label>

            </div>     
            </div>    

            <div className='form__group field'>
                <input 
                    className='form__field'
                    type='text'
                    name="title"
                    id="title"
                    onChange={handleChange}
                    maxLength={99}
                    placeholder='Titulo'
                />
                <label className='form__label' htmlFor='title'>Titulo</label>

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
                <label className='form__label' htmlFor='summary'>Introduccion</label>

            </div>                             
            {/* <div className=''>
                <QuillEditor value={quillContent} onChange={handleQuillChange}/>
            </div> */}
            <div>
                <textarea
                    className='form__area'                    
                    name='content'
                    onChange={handleChange}                    
                />
            </div>
            <div className='form__file__field'>
                <input 
                    className='form__file'
                    onChange={handleCoverChange}
                    type='file'
                    id="cover"
                    placeholder='Portada'
                />
                <label className='form__file__icon' htmlFor='cover'>Insertar Portada <FaCameraRetro/></label>
            </div> 
            <p style={{display:coverExists ? '' : 'none', fontStyle:'italic'}} >Portada cargada</p>

            <div>
                <TagsComponent tags={tags} setTags={setTags}/>
            </div>            
            <button className='create-button' onClick={()=>requestPost()}>
                Publicar
            </button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Create
