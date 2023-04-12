import React from 'react'
import Chip from '../../../common/Chip/index'
import './style.css'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa"
import avatar from './assets/author.jpg'


const BlogItem = ({blog: {
    id,
    content,
    title,
    date,
    author,
    tag,
    cover,
    summary,
}}) => (
    <div className='blogItem-wrap'>
        <img src={`http://localhost:8080/modelsDas/uploads/${cover}`} alt="cover" className='blogItem-cover'/>
        <Chip label={tag}/>
        <h3>{title}</h3>
        <p className='blogItem-desc'>{summary}</p>

        <footer>
            <div className='blogItem-author'>
                <img src={avatar} alt="avatar"/>
                <div>
                    <h6>
                        {author}
                    </h6>
                    <p>
                        {date}
                    </p>
                </div>
            </div>
            <Link className='blogItem-link' to={`/blog/${id}`}>
                <FaArrowCircleRight className='blogItem-arrow'/>
            </Link>
        </footer>
    </div>
)
export default BlogItem