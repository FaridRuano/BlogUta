import React, { useState, useEffect } from 'react'
import EmptyList from '../../components/common/EmptyList'
import BlogList from '../../components/Home/BlogList'
import Header from '../../components/Home/Header'
import SearchBar from '../../components/Home/SearchBar'
import axios from  'axios'

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const baseUrl = 'http://localhost:8080/modelsDas/models/blogs/blogs.php'
  
  const requestData=async()=>{
    await axios.get(baseUrl).then(response=>{
        setBlogList(response.data);
    })
  }
  
  useEffect(()=>{
    requestData()
  },[])

  const [searchKey, setSearchKey] = useState('')

  const handleSearchBar = (e) => {
    e.preventDefault()
    handleSearchResults()
  }

  const handleSearchResults = () => {
    const allBlogs=blogList
    const filteredBlogs=allBlogs.filter((blogList) => 
      blogList.tag.toLowerCase().includes(searchKey.toLowerCase().trim())
    )
    setBlogList(filteredBlogs)
  }

  const handleClearSearch=()=>{
    setBlogList(blogList)
    setSearchKey('')
    requestData()
  }

  return (
    <div>
        {/* Page Header */}
        <Header/>
        {/* Search Bar */}
        <SearchBar 
          value={searchKey}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchBar}
          handleSearchKey={(e) => setSearchKey(e.target.value)}
        />
        {/* Blog List & Empty List */}
        {!blogList.length ? <EmptyList/> : <BlogList blogs={blogList}/>}
    </div>
  )
}

export default Home