import {useEffect} from 'react'
import {Parallax} from 'react-parallax'
import {Link} from 'react-router-dom'
import styles from '../styles/Home.module.css'

const Home = () => {
    const categories=[
        {src:'https://i.postimg.cc/tR8xRKn9/bat.jpg',
        category:'bathroom'},
        {src:'https://i.postimg.cc/nzm4F3LR/home8.jpg',
        category:'kitchenware'}, 
        {src:'https://i.postimg.cc/J4Q2C5tc/deco.jpg',
        category:'deco'}, 
        {src:'https://i.postimg.cc/fRX0pB8B/unknown.png',
        category:'giftcard'}, 
        {src:'https://i.postimg.cc/R0mhJ9vz/sale.jpg',
        category:'sale'}]

    useEffect(()=>{
        window.scroll(0, 0)
        document.title='COZY | Home'
    },[])
    
    const items = categories.map((obj, index)=><div key={index} style={{backgroundImage:`url('${obj.src}')`}}>
      <Link to={`/products/${obj.category}`}><button>{obj.category}</button></Link>
    </div>)
    return (
        <div className={styles.home}>
            <Parallax bgImage={'/assets/home1.jpg'} strength={600}>
              <Link to='/products' className={styles.homeStore}>
                <div>
                  <p>Check out our latest trends</p>
                </div>
              </Link>
            </Parallax>
            <Parallax strength={-200} className={styles.categories}>
                <h1>CATEGORIES</h1>
                <div className={styles.galleryWrap}>
                    {items}
                </div>
            </Parallax>
            <Parallax bgImage={'/assets/home5.jpg'}
            strength={300}>
              <div className={styles.info}>
                <p>There's no place like home. In Cozy we offer a wide variety of well-designed, functional home products. Whether your home decor leans towards minimalist or maximalist aesthetic, you'll find something to suit your style.</p>
              </div>
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