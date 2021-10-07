import {NavLink, Link} from 'react-router-dom'
import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

const Header=({loginUser, logOut, userPhoto})=>{
    const outHandler = () => {
        logOut()
    }

    return(
        <header>
            {loginUser && (
                <div>
                    {/* <div style={{backgroundImage: `url('${userPhoto}')`}}></div> */}
                </div>
            )}
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
                        <NavLink active  onClick={outHandler} to="/">LOGOUT</NavLink>
                    )}
                    <NavLink active to="/"><i class="iconSocial fas fa-shopping-cart fa-1x"></i></NavLink>
                </nav>  
            </div>
        </header>
    )
}
const mapStateToProps =(state)=>{
    return{
        loginUser:state.users.token,
        userPhoto: state.users.photo
    }
}
const mapDispatchToProps={
    logOut: userActions.logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)