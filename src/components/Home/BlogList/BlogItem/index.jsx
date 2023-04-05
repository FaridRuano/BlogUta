import React from 'react'
import Chip from '../../../common/Chip/index'
import './style.css'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";

const BlogItem = ({blog: {
    id,
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    category,
    cover,
}}) => (
    <div className='blogItem-wrap'>
        <img src={cover} alt="cover" className='blogItem-cover'/>
        <Chip label={category}/>
        <h3>{title}</h3>
        <p className='blogItem-desc'>{description}</p>

        <footer>
            <div className='blogItem-author'>
                <img src={authorAvatar} alt="avatar"/>
                <div>
                    <h6>
                        {authorName}
                    </h6>
                    <p>
                        {createdAt}
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