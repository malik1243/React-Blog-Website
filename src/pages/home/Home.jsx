import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/herosection/Herosection'
import Dashboard from '../allBlogs/AllBlog'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, getData } from '../../firebase/firebasemethods'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {

    onAuthStateChanged(auth , async(user)=>{
      if(user){
        console.log(user.uid)
        const blogsData = await getData("blogs" , user.uid)
        console.log(blogsData)
        setBlogs([...blogsData])
      }
    })
}, [])

const sendDatatoFirestore = async (data) => {
  console.log(data)
  try {
    const response = await sendData({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid
    }, 'blogs')
    blogs.push({
      title: data.title,
      description: data.description,
      uid: auth.currentUser.uid
    })
    setBlogs([...blogs])
    console.log(response);


  } catch (error) {
    console.error(error)
  }
}
  return (
    <Layout>
      <HeroSection/>
      <h1 className='text-center underline text-[2rem]'>User Blogs</h1>
      <div className='flex flex-wrap'>
        {blogs.length > 0 ? blogs.map((item, index) => {
          return <div key={index} className="border-2 border-black rounded-xl shadow-xl card w-[350px] h-[250px] m-5 p-3">
            <h1>Title: {item.title}</h1>
            <p className='mt-5'>Description: {item.description}</p>
          </div>
        }) : <h1>No blogs found</h1>}
      </div>
    </Layout>
  )
}

export default Home