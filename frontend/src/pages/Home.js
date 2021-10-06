import {useEffect} from 'react'
import {Parallax} from 'react-parallax'
import '../styles/Home.css'
import Footer from '../components/Footer'

const Home = () => {
    useEffect(()=>{
        window.scroll(0, 0)
        document.title='COZY | Home'
    },[])

    return (
        <div className="home">
            <Parallax 
            bgImage={'/assets/home1.jpg'}
            strength={500}renderLayer={(percentage) => (
                <div>
                  <button
                    style={{
                      background: `rgba(212, 197, 191, ${percentage * 2})`,
                      transform: "translate(-50%,-50%)",
                      left: "80%",
                      top: "60%",
                      width: percentage * 90,
                      height: percentage * 90
                    }}>
                        click
                  </button>
                </div>
              )}>
            </Parallax>
            <Parallax bgImage={'/assets/home2.jpg'}
            strength={-200}renderLayer={(percentage) => (
                <div>
                  <button
                    style={{
                      background: `rgba(212, 197, 191, ${percentage * 2})`,
                      left: "20%",
                      top: "50%",
                      borderRadius: "50%",
                      transform: "translate(-50%,-50%)",
                      width: percentage * 100,
                      height: percentage * 100
                    }}>
                        click
                  </button>
                </div>
              )}>
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
                      borderRadius: "50%",
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