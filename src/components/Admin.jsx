import { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import { app } from '../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function () {
    const [contacts, setContacts] = useState([]);

    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [frame, setFrame] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [catagory, setCatagory] = useState("");

    const [alerts, setAlerts] = useState("");


    useEffect(() => {
        axios.get('/api/all_contact').then(res => {
            setContacts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const upload=async()=>{
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${imgFile.name}`);

        await uploadBytes(storageRef, imgFile)
        setAlerts("Wait for upload finish...")
        
        const url = await getDownloadURL(storageRef)
        setImgUrl(url)
        console.log(url)
        setTimeout(()=>{
            if(url!=""){
                setAlerts("Upload finished...")
            }
        }, 5000)
    }
    
    async function formSubmit(e) {
        e.preventDefault()
            if (imgUrl!=""&&title!=""&&desc!=""&&frame!=""&&catagory!="") {
                const post={
                    "image_url":imgUrl,
                    "title":title,
                    "deseription":desc,
                    "select_image_type":frame,
                    "category":catagory,
                    "like":'0',
                }
                try {
                    const res= await axios.post("/api/post", post);
                    console.log(res);
                    setDesc("");
                    setTitle("")
                    setFrame("")
                    setCatagory("")
                    setImgUrl("")
                    setImgFile(null)
                    setAlerts("Your post is uploaded successfully.")
                } catch (error) {
                    console.log(error)
                }
            }else{
                setAlerts("Give all informations...")
            }
            
    }
    return (
        <section className='flex justify-center items-start mt-4 flex-wrap'>
            <form onSubmit={formSubmit} className='w-[350px] my-5 flex flex-col justify-center gap-3'>
                <div className='flex flex-col'>
                    <label className='text-gray-600 mb-1'>Select an image</label>
                    <input type='file' onChange={(e) => { setImgFile(e.target.files[0]) }} />
                    <button onClick={upload} className='bg-black text-white w-[100px] px-2 py-2 rounded-lg mt-2  transition-all shadow-md shadow-[#000000ae] hover:scale-95 hover:shadow-none'>Upload</button>
                </div>
                <label className='text-gray-600 mb-1'>Select a frame</label>
                <div className='flex gap-2 items-center'>
                    <div className='bg-white border-black border-2 h-8 w-6 flex justify-center items-center'><input onChange={() => { setFrame("p") }} type='radio' name='1' /></div>
                    <div className='bg-white border-black border-2 h-6 w-8 flex justify-center items-center'><input onChange={() => { setFrame("l") }} type='radio' name='1' /></div>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-600'>Enter a title</label>
                    <input type='text' value={title} onChange={(e) => { setTitle(e.target.value) }} className='border-black border-2 rounded-md px-2 py-1' />
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-600'>Enter a description</label>
                    <textarea value={desc} onChange={(e) => { setDesc(e.target.value) }} className='border-black border-2 rounded-md px-2 py-1'></textarea>
                </div>
                <div className='flex flex-col'>
                    <label className='text-gray-600'>Select a catagory</label>
                    <select onChange={(e) => { setCatagory(e.target.value) }}>
                        <option value="">Catagory</option>
                        <option value="Painting">Painting</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Hand Embroidery">Hand Embroidery</option>
                    </select>
                </div>
                <button type='submit' className='bg-black text-white w-[200px] px-2 py-2 rounded-lg mt-2  transition-all shadow-md shadow-[#000000ae] hover:scale-95 hover:shadow-none'>Upload</button>
                <p className='text-blue-600'>{alerts}</p>
            </form>
            <div className='flex flex-col p-2 h-[70vh] overflow-y-scroll'>
                <h1 className='text-gray-500 text-2xl font-semibold mb-2'>Contact Messages</h1>
                {contacts.map((e) => (
                    <div key={e._id} className='m-1 bg-gray-200 p-2 rounded-xl' >
                        <h1 className='text-lg font-semibold'>{e.name}</h1>
                        <h3 className='text-sm text-gray-600'>{e.number}</h3>
                        <p>{e.query}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}