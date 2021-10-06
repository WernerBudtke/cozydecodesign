import "./App.css"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import ProductsGallery from "./pages/ProductsGallery"
import ProductForm from "./pages/ProductForm"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </>
  )
}
export default App
