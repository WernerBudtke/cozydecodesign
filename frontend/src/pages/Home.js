import { useEffect, useState } from 'react'
import { Parallax,Background} from 'react-parallax'

const Home = () => {

    return (
        <div className="home">
            {/* <Parallax 
            bgImage={'https://i.postimg.cc/6QMPcbK1/home5.jpg'}
            strength={800}
            bgImageSize={500}>
                <button>click</button>
            </Parallax>
            <Parallax bgImage={'https://i.postimg.cc/3x7bTQJc/pexels-karolina-grabowska-4202919.jpg'}>
                <button>click</button>
            </Parallax>
            <Parallax bgImage={'https://i.postimg.cc/6QMPcbK1/home5.jpg'}>
                <button>click</button>
            </Parallax> */}
            <div style={{backgroundImage:"url('/assets/home1.jpg')",}}></div>
            <div style={{backgroundImage:"url('/assets/home2.jpg')",}}></div>
            <div style={{backgroundImage:"url('/assets/home3.jpg')",}}></div>
            <div style={{backgroundImage:"url('/assets/home4.jpg')",}}></div>
        </div>
    )
}
export default Home
