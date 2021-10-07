import { useEffect } from "react"
import { Parallax } from "react-parallax"
import { Link } from "react-router-dom"
import "../styles/Home.css"

const Home = () => {
  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "deco" },
    { src: "https://i.postimg.cc/fRX0pB8B/unknown.png", category: "giftcard" },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "sale" },
  ]

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "COZY | Home"
  }, [])

  const items = categories.map((obj, index) => (
    <div key={index} style={{ backgroundImage: `url('${obj.src}')` }}>
      <Link to={`/pruducts/:${obj.category}`}>
        <button>{obj.category}</button>
      </Link>
    </div>
  ))

  return (
    <div className="home">
      <Parallax bgImage={"/assets/home1.jpg"} strength={600}>
        <Link to="/products">
          <button className="homeStore">STORE</button>
        </Link>
      </Parallax>
      <Parallax strength={-200} className="categories">
        <h1>CATEGORIES</h1>
        <div className="gallery-wrap">{items}</div>
      </Parallax>
      <Parallax
        bgImage={"/assets/home5.jpg"}
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
                height: percentage * 100,
              }}
            >
              click
            </button>
          </div>
        )}
      ></Parallax>
      <Parallax
        bgImage={"/assets/home4.jpg"}
        strength={-400}
        renderLayer={(percentage) => (
          <div>
            <button
              style={{
                background: `rgba(212, 197, 191, ${percentage * 2})`,
                left: "10%",
                top: "70%",
                transform: "translate(-50%,-50%)",
                width: percentage * 100,
                height: percentage * 100,
              }}
            >
              click
            </button>
          </div>
        )}
      ></Parallax>
    </div>
  )
}
export default Home
