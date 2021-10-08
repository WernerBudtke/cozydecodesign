import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'
import ReactCircleModal from "react-circle-modal"
import Cart from "./Cart"
import { useEffect, useState } from 'react'


const Header=({loginUser, logOut})=>{
    const [photo, setPhoto] = useState(null)
    const [admin, setAdmin] = useState(null)
    const outHandler = () => {
        logOut()
    }

    useEffect(()=>{
        if(loginUser){
            setPhoto(loginUser.photo.includes('http') ? loginUser.photo : `http://localhost:4000/${loginUser.photo}`)
            setAdmin(loginUser.admin)
        }
    },[])
    
    return(
        <header>
            <div>
                {!loginUser && (
                    <i class="iconSocial fas fa-user fa-2x"></i>
                )}
                {loginUser && (
                    <div className="logoUser" style={{backgroundImage: `url('${photo}')`}}></div>
                )} 
            </div>
            <h1>COZY</h1>
            <div className="navContainer">
                <nav>
                    <NavLink active exact to='/'>HOME</NavLink>
                    <NavLink active to='/products'>STORE</NavLink>
                    {!loginUser && (
                        <NavLink active to='/signin'>SIGN IN</NavLink>
                    )}
                    {!loginUser && (
                        <NavLink active to='/signup'>SIGN UP</NavLink>
                    )}
                    {loginUser && (
                        <NavLink active  onClick={outHandler} to="/">SIGN OUT</NavLink>
                    )}
                    {admin && <NavLink to="/admin">ADMIN</NavLink>}
                    <ReactCircleModal
                        style={{
                        padding: "0",
                        }}
                        backgroundColor="#61605e8a"
                        toogleComponent={(onClick) => (
                        <i
                            onClick={onClick}
                            className="iconSocial fas fa-shopping-cart fa-1x"
                        ></i>
                        )}
                        offsetX={0}
                        offsetY={0}
                        >
                        {(onClick) => <Cart onClickHandler={onClick} />}
                    </ReactCircleModal>
                </nav>  
            </div>
        </header>
    )
}
const mapStateToProps = (state) => {
  return {
    loginUser: state.users.user,
  }
}
const mapDispatchToProps = {
  logOut: userActions.logOut,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
