import { useState } from 'react'
import '../App.css'
import axios from 'axios'

export default function Contact(){
    const[name, setName]=useState('')
    const[phone, setPhone]=useState('')
    const[msg, setMsg]=useState('')

    const nameIn=(e)=>{
        setName(e.target.value)
        document.getElementById('response').innerText=''
    }
    const phoneIn=(e)=>{
        setPhone(e.target.value)
        document.getElementById('response').innerText=''
    }
    const msgIn=(e)=>{
        setMsg(e.target.value)
        document.getElementById('response').innerText=''
    }

    async function sendComment(e){
            e.preventDefault()
            if (name!='' && phone!='' && msg!='') {
                const comment={
                        "name":name,
                        "number":phone,
                        "query":msg
                }
                try {
                    const res=await axios.post('/api/contact',comment)
                    console.log(res)
                    document.getElementById('response').innerText="Thank you for your Comment."
                    document.getElementById('response').style.color="green"
                    setName("")
                    setMsg("")
                    setPhone("")
                } catch (error) {
                    console.log(error)
                }
            }else{
                document.getElementById('response').innerText="Please give a valid input."
                document.getElementById('response').style.color="red"
            }

    }
    return(<section id='contact'
     className='w-full h-auto flex flex-wrap gap-5 px-2 py-20 justify-center items-center'>
        <div className='flex flex-col w-1/3'>
            <h3 className='text-lg my-2 text-gray-400'>CONTACT ME</h3>
            <h1 className='text-5xl font-semibold my-2'>Get in Touch with me.</h1>
            <p className='my-2 text-gray-500'>Have question or need help?
             Reach out me through this given form to message me and i will reach you soon.</p>
        </div>
        <form className='flex flex-col w-[45%] p-2 gap-1' onSubmit={sendComment}>
            <label>Your Name</label>
            <input value={name} onChange={nameIn} type='text' placeholder='Enter your name' className='border-gray-200 border-2 px-2 py-1 rounded-lg'/>
            <label>Phone Number</label>
            <input value={phone} onChange={phoneIn} type='number' placeholder='Enter your number' className='border-gray-200 border-2 px-2 py-1 rounded-lg'/>
            <label>Your Query</label>
            <textarea value={msg} onChange={msgIn} placeholder='Type your message here' className='border-gray-200 max-w-[100%] min-h-20 border-2 px-2 py-1 rounded-lg'>
            </textarea>
            <button className='bg-black text-white w-[200px] px-2 py-2 rounded-lg mt-2 transition-all shadow-md shadow-[#000000ae] hover:scale-95 hover:shadow-none'>SEND</button>
            <div id='response'></div>
        </form>
    </section>)
}