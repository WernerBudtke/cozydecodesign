import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Footer from "./components/Footer"
import Navegador from "./components/navegador"
import { useEffect } from 'react'


const App = (props) => { 
  
  return (
    <BrowserRouter>
    <div>
      <Route component={Navegador}/>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
      <Route component={Footer}/>
    </div>
    </BrowserRouter>
  )
}


export default App;
