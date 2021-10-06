import {useEffect} from 'react'
import {Parallax} from 'react-parallax'
import {Link} from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
    const bestsellers=[
        'https://i.postimg.cc/tR8xRKn9/bat.jpg',
        'https://i.postimg.cc/nzm4F3LR/home8.jpg', 
        'https://i.postimg.cc/J4Q2C5tc/deco.jpg', 
        'https://i.postimg.cc/DZFGhLSL/unknown.png', 
        'https://i.postimg.cc/R0mhJ9vz/sale.jpg']

    useEffect(()=>{
        window.scroll(0, 0)
        document.title='COZY | Home'
    },[])
    
    const items = bestsellers.map((obj, index)=><div key={index} style={{backgroundImage:`url('${obj}')`}}></div>)
    return (
        <div className="home">
            <Parallax 
            bgImage={'/assets/home1.jpg'}
            strength={500}renderLayer={(percentage) => (
                <Link to='/products'
                    style={{
                      background: `rgba(212, 197, 191, ${percentage * 2})`,
                      transform: "translate(-50%,-50%)",
                      right:'20%',
                      bottom:'50%',
                      width: percentage * 90,
                      height: percentage * 90
                    }}>
                    STORE
                </Link>
              )}>
            </Parallax>
            <Parallax
            strength={-200} className='bestsellers'>
                <h1>BESTSELLERS</h1>
                <div class="gallery-wrap">
                    {items}
                </div>
            </Parallax>
            <Parallax bgImage={'/assets/home5.jpg'}
            strength={300}
            renderLayer={(percentage) => (
                <div>
                  <button
                    style={{
                      background: `rgba(212, 197, 191, ${percentage * 2})`,
                      left: "80%",
                      top: "60%",
                      transform: "translate(-50%,-50%)",
                      width: percentage * 100,
                      height: percentage * 100
                    }}>
                        click
                  </button>
                </div>
              )}>
            </Parallax>
            <Parallax bgImage={'/assets/home4.jpg'}
            strength={-400}renderLayer={(percentage) => (
                <div>
                  <button
                    style={{
                      background: `rgba(212, 197, 191, ${percentage * 2})`,
                      left: "10%",
                      top: "70%",
                      transform: "translate(-50%,-50%)",
                      width: percentage * 100,
                      height: percentage * 100
                    }}>
                        click
                  </button>
                </div>
              )}>
            </Parallax>
        </div>
    )
}
export default Home