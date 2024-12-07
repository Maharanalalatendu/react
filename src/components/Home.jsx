import { Link } from 'react-router-dom'
import '../App.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'


export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        axios.get('/api/all_post').then((res) => {
        setPosts(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const findByCategory=async(e)=>{
        const category=e.target.innerText
        if (category=="All") {
            axios.get('/api/all_post').then((res) => {
                setPosts(res.data)
                console.log(res.data)
                }).catch(err=>{
                    console.log(err)
                })
        }else{
            await axios.get(`/api/post/${category}`).then((res=>{
                setPosts(res.data)
                console.log(res.data)
            })).catch(err=>{
                console.log(err)
            })
        }
        
    }

    return (
        <section className=' flex flex-col justify-center items-center'>
            <div id='catagories' className='mx-2 mt-2 gap-2 flex items-center'>
                <p onClick={findByCategory} className='bg-gray-200 py-1 px-3 rounded-lg select-none transition-all duration-300 hover:bg-black hover:text-white'>All</p>
                <p onClick={findByCategory} className='bg-gray-200 py-1 px-3 rounded-lg select-none transition-all duration-300 hover:bg-black hover:text-white' >Painting</p>
                <p onClick={findByCategory} className='bg-gray-200 py-1 px-3 rounded-lg select-none transition-all duration-300 hover:bg-black hover:text-white'>Portrait</p>
                <p onClick={findByCategory} className='bg-gray-200 py-1 px-3 rounded-lg select-none transition-all duration-300 hover:bg-black hover:text-white'>Hand Embroidery</p>
            </div>
            <h1 className=' font-bold text-2xl mt-10'>My Works</h1>
            <div id='container' className=' mt-10 flex flex-wrap gap-8 p-5 justify-center items-center'>
                {
                    posts.length>0 ?(
                        posts.toReversed().map(e => e.select_image_type=="p" ? (
                            <Link to={`/post/:${e._id}`} key={e._id}>
                                <div className=' w-[320px] h-[320px] bg-gray-200 flex justify-center items-center'>
                                    <div id='frame' className=' bg-[#1d1d1d] p-[6px] mt-10 mb-10'>
                                        <div className=' bg-white p-3'>
                                            <div className=' border-2'
                                                style={{
                                                    backgroundImage: `url(${e.image_url})`,
                                                    width: '200px',
                                                    height: '250px',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover'
                                                }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ):(
                            <Link to={`/post/:${e._id}`} key={e._id}>
                                <div className=' w-[320px] h-[320px] bg-gray-200 flex justify-center items-center'>
                                    <div id='frame' className=' bg-[#1d1d1d] p-[6px] mt-10 mb-10'>
                                        <div className=' bg-white p-3'>
                                            <div className=' border-2'
                                                style={{
                                                    backgroundImage: `url(${e.image_url})`,
                                                    width: '250px',
                                                    height: '180px',
                                                    backgroundPosition: 'center',
                                                    backgroundSize: 'cover'
                                                }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ):(
                        <p>Loading ....</p>
                    )
                }


            </div>
        </section>
    )
}