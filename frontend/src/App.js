import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ProductsGallery from './pages/ProductsGallery'
import ProductForm from './pages/ProductForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const App=()=>{
  return(
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={SignIn}/>
      </Switch>
    </BrowserRouter>
    </>
  )
}
export default App
