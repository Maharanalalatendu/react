import '../App.css'
import send from '../assets/send.png'
import unlike from '../assets/love.png'
import like from '../assets/heart.png'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Post() {
    const { postId } = useParams()
    const pId = postId.slice(1)
    const [postInfo, setPostInfo] = useState([])
    const [allComments, setAllComments] = useState([])
    const [islike, setIsLike] = useState(false);

    async function getdata() {
        await axios.get(`/api/each_post/${pId}`).then(res => {
            setPostInfo(res.data)
            setAllComments(res.data.all_comments)
        }).catch(err => {
            console.log(err)
        })
        if(JSON.parse(localStorage.getItem('myLikes')).includes(pId)){
            setIsLike(true)
            document.getElementById('likebtn').src = like;
        }
    }
    getdata()
        
    function likeFun() {
        if (islike == false) {
            setIsLike(true)
            if(localStorage.getItem('myLikes')){
                const likes=JSON.parse(localStorage.getItem('myLikes'))
                const temp=likes.concat([`${pId}`])
                localStorage.setItem('myLikes', JSON.stringify(temp))
            }else{
                const temp=[`${pId}`];
                localStorage.setItem('myLikes', JSON.stringify(temp))
            }
            axios.get(`/api/like/${pId}/1`)
        } else {
            document.getElementById('likebtn').src = unlike;
            setIsLike(false)
            const likes=JSON.parse(localStorage.getItem('myLikes'))
            if(likes.includes(pId)){
                var i=0;
                likes.forEach(e => {
                    if (e==pId) {
                        likes[i]=''
                        localStorage.setItem('myLikes', JSON.stringify(likes))
                        axios.get(`/api/like/${pId}/0`)
                    }
                    i++
                });
            }
        }
    }

    //add comment method
    const [comment, setComment] = useState("")
    async function sendComment() {
        if (comment != "") {
            console.log(pId)
            await axios.post(`/api/comment/${pId}`, {"comment":comment}).then((res) => {
                setComment("")
            }).catch(err => {
                console.log(err)
            })
        }
    }
    return (
        <section className='flex flex-wrap justify-center p-5 gap-3'>
            <div id='postData' className=' p-5 flex flex-col justify-center items-start w-[350px] bg-gray-200 rounded-lg'>
                <h1 className='text-black text-2xl font-semibold'>{postInfo.title}</h1>
                <p className='text-gray-500 text-xs mb-2'>{`#${postInfo.category}`}</p>
                <img src={`${postInfo.image_url}`} className='w-[350px] rounded-lg' onDoubleClick={likeFun} />
                <div id='like' className='flex justify-end w-[100%] items-center gap-2 p-1'>
                    <img src={unlike} width='18px' id='likebtn' onClick={likeFun} />
                    <span className='text-sm text-gray-700'>{`${postInfo.like} Likes`}</span>
                </div>
                <details className='bg-gray-100 w-full p-2 rounded-lg mt-1'>
                    <summary className='text-sm text-gray-700'>...more</summary>
                    <p className='text-sm text-gray-700'>{postInfo.deseription}</p>
                </details>
            </div>
            <div id='commentBox' className='p-2 border-l-2 border-gray-300'>
                <div id='makeComment' className='m-2 flex gap-1 items-center'>
                    <input value={comment} onChange={(e) => { setComment(e.target.value) }} type='text' placeholder='Add a comment...' className='px-2 py-1 rounded-md border-black border-2' /> <img onClick={sendComment} src={send} width='25px' className=' hover:scale-90' />
                </div>
                <div id='commentContainer'>
                    {
                        allComments.map((e) => (
                            <p key={e._id} className='bg-gray-200 text-black p-2 m-2 w-fit rounded-t-2xl rounded-e-2xl text-sm'>
                                {e.comment}
                            </p>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}