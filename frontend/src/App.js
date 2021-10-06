import "./App.css"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "./redux/actions/userActions"
import ProductsGallery from "./pages/ProductsGallery"
import ProductForm from "./pages/ProductForm"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Header from "./components/Header"
import { useEffect } from "react"

const App = ({ user, logFromSession }) => {
  useEffect(() => {
    if (!user) {
      logFromSession()
    }
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/products" component={ProductsGallery} />
        <Route exact path="/productform" component={ProductForm} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}
const mapDispatchToProps = {
  logFromSession: userActions.logFromSession,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
