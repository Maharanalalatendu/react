import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Contact from './components/Contact'
import Admin from './components/Admin'
import Post from './components/EachPost'
import About from './components/About'
import './index.css'
export default function App(){
  return(
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/post/:postId' element={<Post/>}/>
    </Routes>
    <Footer/>
    </>
  )
}