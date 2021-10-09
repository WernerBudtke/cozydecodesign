import { useEffect, useState } from "react"
import { Parallax } from "react-parallax"
import { Link } from "react-router-dom"
import styles from "../styles/Home.module.css"

const Home = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { height, width } = getWindowDimensions()

  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "Bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "Kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "Decor" },
    {
      src: "https://i.postimg.cc/3wdn2zCV/gitfcard-Home.png",
      category: "GiftCard",
    },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "sale" },
  ]

  const info = [
    { src: "./assets/6.png"},
    { src: "./assets/7.png"},
    { src: "./assets/8.png"},
    { src: "./assets/9.png"},
  ]

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "COZY | Home"
  }, [])

  const items = categories.map((obj, index) => (
    <div key={index} style={{ backgroundImage: `url('${obj.src}')` }}>
      <Link to={`/products/${obj.category}`}>
        <button>{obj.category}</button>
      </Link>
    </div>
  ))

  const infoItems = info.map((obj, index) => (
    <div key={index} className={styles.infoItem} style={{ backgroundImage: `url('${obj.src}')` }}>
    </div>
  ))


  return (
    <div className={styles.home}>
            <Parallax bgImage={'/assets/home1.jpg'} strength={height}>
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
            strength={width > 700 ? height/1 : width/0.85}>
              <div className={styles.quote}>
                <h2>There's no place like home. </h2>
                <i class="fas fa-quote-right"></i>
                <p>In Cozy we offer a wide variety of well-designed, functional home products. Whether your home decor leans towards minimalist or maximalist aesthetic, you'll find something to suit your style.</p>
              </div>
            </Parallax>
            <Parallax strength={height/10} className={styles.fondoInfo}>
                <div className={styles.fondoInfo}>
                    {infoItems}
                </div>
            </Parallax>
            <Parallax bgImage={'/assets/home4.jpg'}
            strength={width > 700 ? -width/4 : -width/11}
            renderLayer={(percentage) => (
                <div
                  className={styles.finalInfo}
                  style={{
                    background: `rgba(212, 197, 191, ${percentage * 2})`,
                    width: percentage * 100,
                    height: percentage * 100
                  }}>
                </div>
              )}>
            </Parallax>
      <Parallax
        strength={-4}
        className={styles.fondoInfo}
        bgImage={"https://i.postimg.cc/KzD7qN4y/banner9.png"}
      ></Parallax>
      <Parallax
        bgImage={"/assets/home4.jpg"}
        strength={-400}
        renderLayer={(percentage) => (
          <div
            className={styles.finalInfo}
            style={{
              background: `rgba(212, 197, 191, ${percentage * 2})`,
              width: percentage * 100,
              height: percentage * 100,
            }}
          ></div>
        )}
      ></Parallax>
    </div>
  )
}
export default Home


  {/* return (          <div className={styles.home}>
     <Parallax
        bgImage={"/assets/home1.jpg"}
        strength={height}
      >
        <Link to="/products" className={styles.homeStore}>
          <div>
            <p>Check out our latest trends</p>
          </div>
        </Link>
      </Parallax>
      <Parallax strength={height / 20} className={styles.categories}>
        <h1>CATEGORIES</h1>
        <div className={styles.galleryWrap}>{items}</div>
      </Parallax>
      <Parallax
        bgImage={"/assets/home5.jpg"}
        strength={width > 700 ? -width / 8 : height}
      >
        <div className={styles.info}>
          <h2>There's no place like home. </h2>
          <p>
            There's no place like home. In Cozy we offer a wide variety of
            well-designed, functional home products. Whether your home decor
            leans towards minimalist or maximalist aesthetic, you'll find
            something to suit your style.
          </p>
        </div>
      </Parallax>
      <Parallax
        strength={height / 20}
        className={styles.fondoInfo}
        renderLayer={(percentage) => (
          <div  className={styles.row}>
            <div
            className={styles.finalInfo}
            style={{
              backgroundImage: 'url("/assets/6.png")',
              width: width/8,
              height: width/8,
            }}
          ></div>
          <div
          className={styles.finalInfo}
          style={{
            backgroundImage: 'url("/assets/7.png")',
            width: width/8,
            height: width/8,
          }}
          ></div>
          <div
          className={styles.finalInfo}
          style={{
            backgroundImage: 'url("/assets/8.png")',
            width: width/8,
            height: width/8,
          }}
          ></div>
          <div
          className={styles.finalInfo}
          style={{
            backgroundImage: 'url("/assets/9.png")',
            width: width/8,
            height: width/8,
          }}
          ></div>
          </div>
          
          
        )}
      ></Parallax>
      <Parallax
        bgImage={"/assets/home4a.jpg"}
        strength={height}
        renderLayer={(percentage) => (
          <div
            className={styles.finalInfo}
            style={{
              background: `rgba(212, 197, 191, ${percentage * 2})`,
              width: percentage * 100,
              height: percentage * 100,
            }}
          ></div>
        )}
      ></Parallax>
    </div>
  );
};
export default Home; */}
