import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductsGallery from './pages/ProductsGallery'
import ProductForm from './pages/ProductForm'

const App=()=>{
  return(
    <>
    <Header/>
    <ProductsGallery />
    <ProductForm/>
    <Footer/>
    </>
  )
}
export default App
