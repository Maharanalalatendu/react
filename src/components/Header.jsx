import '../App.css'
import { Link } from 'react-router-dom'
import menu from '../assets/burger-bar.png'
import close from '../assets/x-button.png'

export default function Header() {
    function closeMenu(){
        document.getElementById('hideMenu').style.display='none'
    }
    function openMenu(){
        document.getElementById('hideMenu').style.display='flex'
    }
    return (
        <>
            <nav className='flex justify-between px-10 py-5 border-b-[3px] border-gray-300 backdrop-blur-md sticky top-0 bg-gray-200/60'>
                <div id='logo' className=' font-bold'>
                    <Link to='/'>API_art</Link>
                </div>
                <div id='btns' className='flex gap-8'>
                    <img src={menu} width='30px' className=' hidden' id='menuBtn' onClick={openMenu}/>
                    <li className=' list-none' id='hide'><Link to='/'>My Work</Link></li>
                    <li className=' list-none' id='hide'><Link to='/about'>About</Link></li>
                    <li className=' list-none' id='hide'><Link to='/contact'>Contact</Link></li>
                </div>
            </nav>
            <div id='hideMenu' className=' absolute hidden top-0 left-0 bg-black w-full h-screen text-white px-10 py-5 justify-between items-start'>
                <div className='flex flex-col gap-2'>
                    <li className=' list-none' onClick={closeMenu}><Link to='/'>My Work</Link></li>
                    <li className=' list-none' onClick={closeMenu}><Link to='/about'>About</Link></li>
                    <li className=' list-none' onClick={closeMenu}><Link to='/contact'>Contact</Link></li>
                </div>
                <img src={close} width='20px' onClick={closeMenu}/>
            </div>
        </>
    )
}