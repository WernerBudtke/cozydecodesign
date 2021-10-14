import { useEffect, useState } from "react"
import { Parallax } from "react-parallax"
import { Link } from "react-router-dom"
import styles from "../styles/Home.module.css"
import Button1 from "../components/Button1"
import Header from "../components/Header"
import { Modal } from "react-responsive-modal"
import "react-responsive-modal/styles.css"

const Home = ({ location, history }) => {
  const [open, setOpen] = useState(false)
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
    history.replace()
    if (location.state) {
      setOpen(true)
    }
    window.scroll(0, 0)
    document.title = "COZY | Home"
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { height, width } = getWindowDimensions()

  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "decor" },
    {
      src: "https://i.postimg.cc/3wdn2zCV/gitfcard-Home.png",
      category: "giftcard",
    },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "sale" },
  ]

  const info = [
    { src: "./assets/6.png" },
    { src: "./assets/7.png" },
    { src: "./assets/8.png" },
    { src: "./assets/9.png" },
  ]

  const items = categories.map((obj, index) => (
    <div key={index} style={{ backgroundImage: `url('${obj.src}')` }}>
      <Link to={`/products/${obj.category}`}>
        <button className={styles.textButton}>{obj.category}</button>
      </Link>
    </div>
  ))

  const infoItems = info.map((obj, index) => (
    <div
      key={index}
      className={styles.infoItem}
      style={{ backgroundImage: `url('${obj.src}')` }}
    ></div>
  ))
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  return (
    <>
      <Header />
      <div className={styles.home}>
        <Parallax bgImage={"/assets/home1.jpg"} strength={height}>
          <Link to="/products" className={styles.homeStore}>
            <Button1>Check out our latest trends</Button1>
          </Link>
        </Parallax>
        <Parallax strength={-200} className={styles.categories}>
          <h1>CATEGORIES</h1>
          <div className={styles.galleryWrap}>{items}</div>
        </Parallax>
        <Parallax
          bgImage={"/assets/home5.jpg"}
          strength={width > 700 ? height / 1 : width / 0.85}
        >
          <div className={styles.quote}>
            <h2>There's no place like home. </h2>
            <i className="fas fa-quote-right"></i>
            <p>
              In Cozy we offer a wide variety of well-designed, functional home
              products. Whether your home decor leans towards minimalist or
              maximalist aesthetic, you'll find something to suit your style.
            </p>
          </div>
        </Parallax>
        <Parallax strength={height / 10} className={styles.infoContainer}>
          <div className={styles.fondoInfo}>{infoItems}</div>
        </Parallax>
        <Parallax
          bgImage={"/assets/home4.jpg"}
          strength={width > 700 ? -width / 5.5 : width / 15}
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
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        center
      >
        <div
          className={styles.modalContainer}
          style={{
            backgroundImage: "url('./assets/c.png')",
          }}
        >
          <div>
            <h2>COZY</h2>
            <p>
              Thank you for your purchase! You'll be receiving an email with all
              the details.
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Home
