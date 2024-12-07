import '../App.css'
import yt from '../assets/youtube.png'
import ig from '../assets/instagram.png'
import fb from '../assets/facebook.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='p-5 flex flex-col gap-2 border-t-2 mt-5 pb-0'>
            <div className=' mb-5'>
                <li className='list-none font-bold'>ArtsForYou</li>
            </div>
            <div className='flex flex-wrap justify-between gap-5 text-[#404040]'>
                <div className='flex flex-col gap-1'>
                    <li className='list-none w-full text-lg text-black'>Usefull Links | </li>
                    <li className='list-none hover:text-black'><Link to='/'>My Arts</Link></li>
                    <li className='list-none hover:text-black'><Link to='/about'>About me</Link></li>
                    <li className='list-none hover:text-black'><Link to='/contact'>Contact me</Link></li>
                </div>
                <div className='flex flex-col gap-1 '>
                    <li className='list-none w-full text-lg text-black'>Reach Me | </li>
                    <p className='w-[250px]'>Address : Odisha , Balasore, India, Odisha</p>
                    <p>Phone No. : <a href='tel:+918249597276' className='hover:text-black'>+91 82495 97276</a></p>
                    <p>Email : <a href='mailto:aparamail124@gmail.com' className='hover:text-black'>aparamail124@gmail.com</a></p>
                </div>
                <div className='flex flex-col gap-1'>
                    <li className='list-none w-full text-lg text-black'>Join Me | </li>
                    <li className='list-none hover:text-black flex items-center gap-2'><img src={yt} width='18px'/><a href='https://www.youtube.com/@aparajitasahoo3643'>Youtube</a></li>
                    <li className='list-none hover:text-black flex items-center gap-2'><img src={fb} width='18px'/><a href='https://www.facebook.com/share/1HQ87pFvn7/'>Facebook</a></li>
                    <li className='list-none hover:text-black flex items-center gap-2'><img src={ig} width='18px'/><a href='https://www.instagram.com/apiartstudio/profilecard/?igsh=eG1tNWJldjA3bzZ3'>Instagram</a></li>
                </div>
            </div>
            <div className=' mt-2 p-2'>
                <li className='list-none text-base text-center'>Copyright© 2024-25 All rights reserved.</li>
            </div>
        </footer>
    )
}