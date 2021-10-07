import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import userActions from './redux/actions/userActions'
import ProductsGallery from './pages/ProductsGallery'
import ProductForm from './pages/ProductForm'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import HoverCard from './pages/HoverCard'
import Header from './components/Header'
import Footer from './components/Footer'
import Product from './pages/Product'


const App=({token, logFromSession})=>{
  useEffect(()=>{
    if (!token){
      logFromSession()
    }
  }, [])

  return (
    <BrowserRouter>
    <Toaster/>
      <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route exact path="/products" component={ProductsGallery}/>
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/productform" component={ProductForm}/>
          <Route exact path="/hover" component={HoverCard}/>
          <Redirect to="/" />
        </Switch>
      <Footer/>
    </BrowserRouter>
  )
}
const mapStateToProps=(state)=>{
  return{
    token: state.users.token,
  }
}
const mapDispatchToProps = {
  logFromSession: userActions.logFromSession,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
