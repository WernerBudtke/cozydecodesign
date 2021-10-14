import "./App.css"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect } from "react"
import userActions from "./redux/actions/userActions"
import ProductsGallery from "./pages/ProductsGallery"
import ProductForm from "./pages/ProductForm"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Product from "./pages/Product"
import Admin from "./pages/Admin"
import cartActions from "./redux/actions/cartActions"
import PaymentGateway from "./pages/PaymentGateway"
import PayWithCard from "./components/PayWithCard"

const App = ({ loginUser, logFromSession, addCartLS }) => {
  useEffect(() => {
    if (!loginUser) {
      logFromSession()
    }
    if (localStorage.getItem("cart")) {
      addCartLS(JSON.parse(localStorage.getItem("cart")))
    }
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {!loginUser && <Route path="/signin" component={SignIn} />}
        {!loginUser && <Route path="/signup" component={SignUp} />}
        <Route exact path="/products" component={ProductsGallery} />
        <Route path="/products/:category" component={ProductsGallery} />
        <Route path="/product/:id" component={Product} />
        <Route
          exact
          path="/productform"
          component={loginUser && loginUser.admin ? ProductForm : Home}
        />
        <Route
          path="/productform/:id"
          component={loginUser && loginUser.admin ? ProductForm : Home}
        />
        {loginUser && loginUser.admin && (
          <Route path="/admin" component={Admin} />
        )}
        {loginUser && <Route path="/payment" component={PaymentGateway} />}
        <Route path="/paywithcard" component={PayWithCard}/>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}
const mapStateToProps = (state) => {
  return {
    loginUser: state.users.user,
  }
}
const mapDispatchToProps = {
  logFromSession: userActions.logFromSession,
  addCartLS: cartActions.addCartLS,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
