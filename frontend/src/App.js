import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import userActions from './redux/actions/userActions'
import ProductsGallery from './pages/ProductsGallery'
import ProductForm from './pages/ProductForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './pages/Home'

const App=()=>{

  return(
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route exact path="/products" component={ProductsGallery}/>
          <Route exact path="/productForm/:id" component={ProductForm}/>
          <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  )
}
const mapStateToProps=(state)=>{
  return{
    user: state.users.user,
  }
}
const mapDispatchToProps={
  logFromSession:userActions.logFromSession
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
