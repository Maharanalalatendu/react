import '../App.css'
import profile from '../assets/myPic.jpg'

export default function About(){
    return(
        <section className='flex flex-col items-center px-10'>
            <img src={profile} className=' min-w-[280px] w-[30vw] mt-4'/>
            <p className='text-center mt-4 text-2xl font-medium'>
                An Artist's words...
            </p>
            <p className='text-center mt-1'>
                My art life began in 2011. With a longstanding interest in a wide variety of topics,
                 I m in the way to build an extensive portfolio and want to become a leading voice in the painting world.
                 I regularly contribute stories to a number of different emotions and expressions as a message for society in current topics,
                 and enjoy spending time developing my ideas into engaging these on my canvas, short stories, and longer form essays.
                  I love sharing my views and hearing about yours!
            </p>
        </section>
    )
}