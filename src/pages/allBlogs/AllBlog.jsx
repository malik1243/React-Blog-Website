import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { auth, getData, sendData } from '../../firebase/firebasemethods'
import { onAuthStateChanged } from 'firebase/auth'

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

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
    <>
      <h1 className='text-center m-3 text-[3rem] underline'>Dashboard</h1>
      <form onSubmit={handleSubmit(sendDatatoFirestore)} className='m-5'>
        <input className='border-2 border-black p-2 rounded-xl shadow-lg' type="text" placeholder='title' {...register("title", { required: true })} /> <br />
        {errors.title && <span>This field is required</span>}
        <br />
        <textarea className='border-2 border-black p-1 rounded-xl shadow-lg' cols='25' rows='5' placeholder='enter description' {...register("description", { required: true })} ></textarea> <br /><br />
        {errors.description && <span>This field is required</span>}

        <button className='border-2 border-black bg-blue-gray-800 text-red-50 p-2 rounded hover:bg-red-500' type='submit'>add Blog</button>
      </form>

      <h1 className='text-center underline text-[2rem]'>User Blogs</h1>
      <div className='flex flex-wrap'>
        {blogs.length > 0 ? blogs.map((item, index) => {
          return <div key={index} className="border-2 border-black rounded-xl shadow-xl w-[350px] h-[250px] card m-5 p-3">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        }) : <h1>No blogs found</h1>}
      </div>
    </>
  )
}

export default Dashboard