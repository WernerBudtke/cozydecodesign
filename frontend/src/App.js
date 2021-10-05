import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductsGallery from './pages/ProductsGallery'
import ProductForm from './pages/ProductForm'

const App=()=>{
  return(
    <>
    <BrowserRouter>
      <Route component={Navegador}/>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
      <Route component={Footer}/>
    </BrowserRouter>
    </>
  )
}
export default App