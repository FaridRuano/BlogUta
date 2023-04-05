import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import dayjs from "dayjs";



const Create = () => {

	const baseUrl = "https://localhost:8080/modelsDas/models/blogs/blogs.php";
    const history = useNavigate();
    const [data, setData] = useState([]);	
    const [value, setValue] = useState([dayjs()]);

    const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
        })
    }

    const [selectedBlog, setSelectedBlog] = useState({
		autor: '',
		title: '',
		content: '',
		image: '',
		category: '',
		date: '',
	  });

    const handleChange=e=>{		
		const{name, value}=e.target;
		setSelectedBlog((prevState)=>({
			...prevState,
			[name]: value,
		}))		
        console.log(selectedBlog)
	}

    function onChangeDate(value){
		let date = dayjs(value).format('YYYY-MM-DD')
		setSelectedBlog({...selectedBlog, ini: date});
		setValue(value);
	}

    useEffect(()=>{
        requestGet();
    },[])

    const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/`);
	};

    const requestPost=async()=>{	
		let emptiness, repeatness, valideteness = false;
		
				
		if(!emptiness && !repeatness && !valideteness){		
			var f = new FormData();   
			f.append("autor", selectedBlog.autor);
			f.append("title", selectedBlog.title);
			f.append("content", selectedBlog.content);
			f.append("image", selectedBlog.image);
			f.append("category", selectedBlog.category);
			f.append("METHOD", "POST");
			await axios.post(baseUrl, f).then(response=>{
				setSelectedBlog('');
			}).catch(error=>{
			console.log(error);
			});		
			routeChange();
		}
	}

  return (
    <div>
        <Link className='create-goBack' to='/'><span>&#8592;</span> Go Back
        </Link>

        <div className='create-warp'>
            <form>
                <div className='createInput-warp'>
                    <TextField 
                        id="standard-basic" 
                        label="Clave de publicacion" 
                        variant="standard" 
                    />
                </div>
                <div className='createInput-warp'>
                    <TextField 
                        id="standard-basic" 
                        label="Autor" 
                        variant="standard"
                        name="autor"
                        onChange={handleChange}
                    />
                </div>                
                <div className='createInput-warp'>
                    <TextField 
                        id="standard-basic"
                        label="Titulo"
                        variant="standard"
                        name="title"
                        onChange={handleChange}
                    />
                </div>                
                <div className='createInput-warp'>
                    <TextField
                        id="standard-basic"
                        label="Contenido"
                        multiline
                        rows={4}    
                        name="content"
                        onChange={handleChange}                    
                    />
                </div>
                <div className='createInput-warp'>
                    <TextField 
                        id="standard-basic"
                        label="Imagen"
                        variant="standard"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className='createInput-warp'>
                    <TextField 
                        id="standard-basic"
                        label="Categoria"
                        variant="standard" 
                        name="category"
                        onChange={handleChange}
                    />
                </div>
                <div className='createInput-warp buttons'>
                    <div className='Datepicker'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            inputFormat="YYYY-MM-DD"																								                            
                        />
                    </LocalizationProvider>
                    </div>
                    <div className='Button-post'>
                        <button className='create-button' onClick={()=>requestPost()}>
                            Publicar
                        </button>
                    </div>                    
                </div>
            </form>            
        </div>
    </div>
  )
}

export default Create