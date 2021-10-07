import {NavLink, Link} from 'react-router-dom'
import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

const Header=({token, logOut, firstName})=>{
    return(
        <header>
            <h1>COZY</h1>
            <div className="navContainer">
                <nav>
                    <NavLink active exact to='/'>HOME</NavLink>
                    <NavLink active to='/signin'>SIGN IN</NavLink>
                    <NavLink active to='/signup'>SIGN UP</NavLink>
                    <NavLink active to='/products'>STORE</NavLink>
                </nav>  
            </div>
        </header>
    )
}
const mapStateToProps =(state)=>{
    return{
        token:state.users.token,
        firstName: state.users.firstName
    }
}
const mapDispatchToProps={
    logOut: userActions.logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
